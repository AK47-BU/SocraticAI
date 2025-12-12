Socratic AI - Historical Figure Chatbot
Socratic AI is an interactive educational platform designed to foster critical thinking through the dialectical method of Socrates. Unlike standard chatbots that provide direct answers, this application embodies the persona of Socrates, using probing questions to challenge users' assumptions, deconstruct beliefs, and encourage deep self-reflection.

Built for the Software Engineering (2025/26) module, this project combines a React frontend with a Node.js/Express backend, utilizing a hybrid logic engine that blends structured scripting with the Groq AI API.

🏛️ Features
Authentic Socratic Method: The bot refuses to give answers, instead asking follow-up questions to expose contradictions (the Elenchus method).

Hybrid Logic Engine:

Scripted Paths: A JSON state machine handles core philosophical topics (Justice, Virtue, Knowledge) to ensure pedagogical accuracy.

AI Fallback: Integrates with the Groq API (Llama 3.3) to handle dynamic or unexpected user inputs while maintaining the persona.

Immersive Visuals:

Interactive "Liquid Chrome" background using GLSL shaders.

Greek mythological theme with marble textures and "Star Border" animations.

Accessibility & Customization:

Dark Mode: "Deep Slate" high-contrast theme.

Text Scaling: Toggle between Normal and Large text sizes.

Session Memory: The backend tracks conversation history to maintain context during the inquiry.

🛠️ Tech Stack
Frontend: React 19, Vite, OGL (for WebGL shaders), CSS Variables.

Backend: Node.js, Express, OpenAI SDK (configured for Groq).

AI Model: Llama-3.3-70b-versatile (via Groq Cloud).

🚀 Getting Started
Prerequisites
Node.js (v18 or higher recommended)

npm (Node Package Manager)

A valid API Key from Groq Cloud

Installation Guide
The application is divided into two parts: the Backend (server) and the Frontend (client). You must run both for the app to function.

1. Backend Setup
Navigate to the backend directory:



cd backend
Install dependencies:



npm install
Configure Environment Variables:

Create a file named .env in the backend/ folder.

Add your Groq API key:

Code snippet

GROQ_API_KEY=your_groq_api_key_here
Start the server:



node server.js
The server should start running on http://localhost:3001.

2. Frontend Setup
Open a new terminal window and navigate to the project root (where the main package.json is located):



cd socraticai


Install dependencies:



npm install
Start the development server:



npm run dev
Open your browser and navigate to the local URL provided (usually http://localhost:5173).


📖 How to Use
Enter the Academy: Click the button on the splash screen to enter the main chat interface.

State a Belief: Socrates will ask you to state a belief you hold to be true ("Justice is fairness" or "Virtue can be taught").

The Inquiry:

The bot will ask you to define your terms or provide examples.

Answer honestly. If you try to change the subject, Socrates may gently guide you back to the inquiry.

Use the History Menu (top left hamburger icon) to switch between different inquiries.

Settings: Click the gear icon in the menu to toggle Dark Mode or adjust Text Size.

📂 Project Structure
socraticai/
├── src/
│   ├── components/      # UI Components (ChatWindow, LiquidChrome, etc.)
│   ├── Assets/          # Images (Socrates avatar, Logos)
│   ├── App.jsx          # Main frontend logic & state
│   └── main.jsx         # Entry point
├── backend/
│   ├── data/            # socrates-script.json (Conversation logic)
│   ├── logic/           # chatlogic.js (State machine & AI integration)
│   ├── routes/          # chatrouter.js (API endpoints)
│   └── server.js        # Express server entry point
└── package.json         # Frontend dependencies

👥 Authors (Group 4)
Adam Kulik - Backend & Architecture

Elliott Tompkins - Frontend & UI Design

Masbiullah Oriakhail - Frontend & Visuals

Talliah Keenan - Backend & Testing


⚖️ License & Academic Integrity
This project is submitted for the Software Engineering (Level 5) assessment at Bournemouth University.

AI Usage: Generative AI (Groq/Llama 3) is used dynamically for conversation generation as per the assessment brief extensions.

Originality: The core state machine, frontend design, and shader implementations are original work by the group.
