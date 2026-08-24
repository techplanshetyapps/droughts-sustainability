# Drought Monitoring & AI Prediction Dashboard

An enterprise-grade sustainability application built to monitor regional drought parameters, leverage local LLM intelligence (**Llama 3.2 via Ollama**), and store telemetry data securely in a cloud-hosted **Aiven PostgreSQL** database.

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



cat << 'EOF' > README.md
# Drought Monitoring & AI Prediction Dashboard

An enterprise-grade sustainability application built to monitor regional drought parameters, leverage local LLM intelligence (**Llama 3.2 via Ollama**), and store telemetry data securely in a cloud-hosted **Aiven PostgreSQL** database.

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
