<div align="center"> 

# Drought Monitoring & AI Prediction Dashboard

<p>
  <img src="https://img.shields.io/badge/Aiven-FF4F00?style=for-the-badge&logo=aiven&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <a href="https://terrapredict.vercel.app">
    <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>
</div>

--- 

An enterprise-grade sustainability application built to monitor regional drought parameters, leverage local LLM intelligence (**Llama 3.2 via Ollama**), and store telemetry data securely in a cloud-hosted **Aiven PostgreSQL** database.

---

## Technology Stack & Architecture 

* **Backend:** Node.js, Express.js (JavaScript)
* **Frontend / UI:** Tailwind CSS, HTML5, CSS3, Responsive Layouts
* **Database & Cloud PaaS:** Aiven PostgreSQL Database
* **AI & LLM Orchestration:** Ollama (Llama 3.2)
* **Deployment & Hosting:** Vercel PaaS

---

## Features

* **AI-Powered Risk Assessment:** Automatically queries a local Llama 3.2 model to analyze town size, affected area, and duration, generating concise real-time risk predictions.
* **Preloaded Dataset:** Automatically seeds the database with 20 realistic regional drought records on first startup.
* **Scrollable Extended UI:** Modern, responsive frontend featuring a clean form layout and a scrollable data container optimized for large datasets.
* **Cloud Database Integration:** Uses secure SSL connections to persist data directly into Aiven PostgreSQL.

---

## Project Directory Structure

```text
droughts-sustainability/
├── public/
│   └── index.html      # Frontend UI dashboard
├── node_modules/       # Dependencies
├── index.js            # Express backend server & database initialization
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

---

## Running Locally

**Install Dependencies & Start Application:**
   ```bash
   npm install
   node index.js
   ```
