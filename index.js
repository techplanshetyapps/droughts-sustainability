const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const initialData = [
    ['Springfield', 45.5, 30, 'Moderate risk of soil degradation and crop stress.'],
    ['Oak Creek', 120.0, 60, 'High severity alert; immediate water rationing advised.'],
    ['Pine Valley', 15.2, 14, 'Low risk; expected to recover with seasonal rain.'],
    ['Dusty Basin', 210.4, 90, 'Critical severe drought impact across municipal water supply.'],
    ['Rivertown', 85.0, 45, 'Significant agricultural loss projected without intervention.'],
    ['Copper Creek', 55.2, 25, 'Mild dry spell; monitoring soil moisture levels recommended.'],
    ['Silver Lake', 140.8, 75, 'Severe water depletion in local reservoirs; conservation required.'],
    ['Highland', 32.1, 10, 'Minimal impact; short-term dryness with no threat to crops.'],
    ['Amber Fields', 195.0, 80, 'High risk of widespread crop failure and livestock feed shortage.'],
    ['Cedar Ridge', 64.3, 35, 'Moderate risk; early signs of vegetation stress observed.'],
    ['Stone Creek', 110.5, 50, 'Elevated drought conditions affecting local irrigation channels.'],
    ['Willow Creek', 22.4, 18, 'Low risk, minor dry patch expected to clear up soon.'],
    ['Sun Valley', 175.9, 85, 'Critical warning; extreme heat driving severe soil desiccation.'],
    ['Meadowbrook', 48.0, 28, 'Moderate advisory; voluntary water conservation suggested.'],
    ['Red Rock', 230.1, 100, 'Extreme emergency; total aquifer depletion risk imminent.'],
    ['Cloverfield', 39.4, 21, 'Low to moderate risk; localized watering restrictions advised.'],
    ['Dry Creek', 155.6, 70, 'High alert; severe impact on regional farming and grazing.'],
    ['Echo Valley', 70.2, 40, 'Moderate risk of wildfire hazard due to dry underbrush.'],
    ['Pioneer Town', 95.8, 55, 'Significant stress on municipal groundwater reserves.'],
    ['Bison Range', 188.3, 82, 'Severe ecological strain affecting regional wildlife habitats.']
];

async function initializeDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS droughts (
            id SERIAL PRIMARY KEY,
            town VARCHAR(100) NOT NULL,
            size DECIMAL(10, 2) NOT NULL,
            duration INT NOT NULL,
            prediction TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    
    try {
        await pool.query(createTableQuery);
        console.log('Database table "droughts" verified.');
        
        const checkRows = await pool.query('SELECT COUNT(*) FROM droughts');
        if (parseInt(checkRows.rows[0].count) === 0) {
            for (let row of initialData) {
                await pool.query(
                    'INSERT INTO droughts (town, size, duration, prediction) VALUES ($1, $2, $3, $4)',
                    row
                );
            }
            console.log('Pre-loaded 20 dataset records successfully inserted into Aiven.');
        }
    } catch (err) {
        console.error('Database initialization error:', err.message);
    }
}

initializeDatabase();

function generateSmartPrediction(town, size, duration) {
    if (duration > 60 || size > 150) {
        return `AI Risk Analysis: Critical severity detected in ${town}. Prolonged conditions across ${size} sq km over ${duration} days threaten regional water reserves. Immediate conservation is advised.`;
    } else if (duration > 30 || size > 50) {
        return `AI Risk Analysis: Moderate impact for ${town}. Sustained dryness spanning ${duration} days requires regular monitoring of soil moisture levels.`;
    } else {
        return `AI Risk Analysis: Low risk profile for ${town}. Short-term dry patch over ${size} sq km is manageable with normal seasonal recovery expected.`;
    }
}

app.get('/api/towns', (req, res) => {
    const townsList = initialData.map(item => ({
        town: item[0],
        size: item[1],
        duration: item[2]
    }));
    res.json(townsList);
});

app.get('/api/droughts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM droughts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Fetch droughts error:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/droughts', async (req, res) => {
    let { town, size, duration } = req.body;
    
    if (!town) {
        return res.status(400).json({ error: 'Town name is required.' });
    }

    size = parseFloat(size);
    duration = parseInt(duration, 10);

    if (isNaN(size) || isNaN(duration)) {
        return res.status(400).json({ error: 'Invalid size or duration format.' });
    }

    let aiPrediction = '';

    try {
        const ollamaResponse = await axios.post('http://127.0.0.1:11434/api/generate', {
            model: 'llama3.2',
            prompt: `Analyze this drought: Town: ${town}, Size: ${size} sq km, Duration: ${duration} days. Provide a concise 1-sentence risk prediction.`,
            stream: false
        }, { timeout: 3000 });

        if (ollamaResponse.data && ollamaResponse.data.response) {
            aiPrediction = ollamaResponse.data.response.trim();
        }
    } catch (err) {
        aiPrediction = generateSmartPrediction(town, size, duration);
    }

    try {
        const query = 'INSERT INTO droughts (town, size, duration, prediction) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await pool.query(query, [town, size, duration, aiPrediction]);
        res.status(201).json(result.rows[0]);
    } catch (dbErr) {
        console.error('Database insertion error details:', dbErr.message);
        res.status(500).json({ error: `DB Error: ${dbErr.message}` });
    }
});

module.exports = app;