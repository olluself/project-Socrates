# Project Socrates

Project Socrates is a web application that transforms passive movie-watching into an active learning experience. Using a 6-agent AI system, it analyzes film scripts to extract practical life lessons, strategies, and insights.

## 🚀 Live Demo

Experience the live version of the project deployed on Vercel:

### **project-socrates.vercel.app**

*(Please replace `[project-socrates.vercel.app](https://project-socrates-inky.vercel.app)` with your actual Vercel project URL)*

## 🌟 Key Features

- **AI-Powered Analysis:** A unique 6-agent pipeline that deconstructs movie plots into actionable case studies.
- **Interactive Netflix-style UI:** A familiar and intuitive interface for browsing movies and their analyses.
- **Dynamic Content:** All movie data and analyses are fetched in real-time from a Firebase database.
- **Bilingual Interface:** The user interface supports both English and Polish.
- **Responsive Design:** Fully functional across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, TailwindCSS, JavaScript (ES6 Modules)
- **Backend & Data Processing:** Python, Google Colab
- **AI:** Google Gemini API (gemini-1.5-pro & gemini-1.5-flash)
- **Database:** Google Firebase (Firestore)
- **Deployment:** Vercel

## 📂 Project Structure

The project is organized into two main parts: the frontend application and the backend data processing script.

```
/
├── index.html          # Main landing page
├── style.css           # Styles for the landing page
├── script.js           # Logic for the landing page
│
└── /demo/
    ├── index.html      # Interactive demo page
    ├── style.css       # Styles for the demo
    └── script.js       # Logic for the demo (Firebase connection, etc.)

```

## 🧠 Backend & Data Processing

The core analysis is performed by a Python script running in Google Colab. This script:

1. Fetches movie data from various sources.
2. Uses the 6-agent Gemini-powered system to generate in-depth analyses.
3. Populates the Firestore database with the results.

You can view the commented source code of the data processing pipeline here:

- **Backend Code:** **View on Google Colab**

*(Please replace the text above with the public "share" link to your Colab notebook).*

### **How to present this to the jury:**

When submitting your project, provide the following links as plain text:

- **Live Demo:** `your-vercel-link.vercel.app`
- **GitHub Repository:** `github.com/[your-username]/[your-repo-name]`
- **Backend Code (Colab):** `your-colab-link`
