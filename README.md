# era-lab-repo

https://era-lab-repo.netlify.app/
🧭 Project Overview

ERA-Lab Data Repository is a lightweight, open-access web platform developed to host and share validated datasets, methodologies, and project outputs from the Energy Research and Advocacy Lab (ERA-Lab). The repository serves as a transparent knowledge hub for early-career researchers, policymakers, and practitioners working on issues of energy justice, climate adaptation, and sustainable development in Africa.

This project models the repository interface after the Net Zero Tracker
 — providing a searchable, categorized database of ERA-Lab research outputs — while remaining simple enough to run as a static site on free hosting services like Netlify or GitHub Pages.

⚙️ What the Project Does

The repository enables users to:

🔍 Search and filter datasets by title, author, or category.

📄 View metadata summaries for each dataset or project (authors, year, description).

⬆️ Upload new datasets with title, category, authors, year, summary, and file attachments (PDF/CSV/ZIP).

💾 Store uploads locally in the user’s browser (localStorage) — ideal for prototyping and offline demonstrations.

📤 Export and import repository contents as JSON backups, preserving records for transfer or collaboration.

🧩 Extend easily — the site can later integrate cloud storage (e.g., Firebase, AWS S3) for shared uploads.

🧱 Technical Summary

Built with HTML, CSS, and vanilla JavaScript (no external frameworks).

Fully client-side; no backend required for local operation.

Includes a responsive layout with searchable dataset cards and an upload portal.

Compatible with static deployment (Netlify, GitHub Pages, or any simple web server).

Code structured in three files:

index.html — page structure and interface

styles.css — layout and visual design

app.js — logic for dataset management, search, uploads, and export/import

📊 Example Datasets Included

The repository is pre-populated with real ERA-Lab research outputs:

Arsenic in Potable Water Sources in Nigeria — A geospatial meta-analysis of heavy metal contamination.

Energy Justice and Gender Dimensions in Nigeria’s Renewable Energy Transition — A study of gendered and social aspects of energy access and policy in Ekiti State.

Flood Risk Management and Socioeconomic Resilience in Lagos — A framework for community-based flood resilience planning.

Each dataset includes summaries, metadata, and placeholders for files that can be replaced or expanded with actual project data.

🚀 How to Run

Download or clone the repository.

Open index.html in your browser — no setup required.

To deploy online, drag and drop the project folder to Netlify Drop
.

(Optional) Push to GitHub and enable GitHub Pages for free hosting.

🔮 Future Development

Integration with cloud-based storage for shared uploads (Firebase, AWS S3).

User authentication and role-based upload permissions.

Enhanced analytics dashboard for dataset metrics and downloads.

API for linking datasets to publications and policy briefs.
