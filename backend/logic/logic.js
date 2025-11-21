JavaScript
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle file paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Global State and Data Loading ---

// Global map to hold conversation states for all sessions.
const activeSessions = new Map();

// Load the conversation script
const scriptPath = path.join(__dirname, '../data/socrates-script.json');
let conversationScript = {}; 

try {
  const data = readFileSync(scriptPath, 'utf8');
  conversationScript = JSON.parse(data);
  console.log("Conversation script loaded successfully.");
} catch (error) {
  console.error("Error loading conversation script:", error);
  // Fail-safe backup
  conversationScript = {
    "initial_belief": {
      "fallbackText": "An internal error occurred in my memory. Let us begin anew. What is a belief you hold to be true?"
    }
  };
}

// --- Logic Functions ---

// Retrieves or initializes session state
function getSession(conversationId) {
  let session = activeSessions.get(conversationId);
  if (!session) {
    session = { currentState: 'greeting' };
    activeSessions.set(conversationId, session);
  }
  return session;
}

// Generates the AI's response
export function generateSocraticResponse(conversationId, userMessage) {
  const session = getSession(conversationId);
  const sanitizedMessage = userMessage.toLowerCase().trim();

  let currentNodeKey = session.currentState;
  const currentNode = conversationScript[currentNodeKey];

  // Fallback for unknown state
  if (!currentNode) {
    currentNodeKey = 'initial_belief'; 
    session.currentState = currentNodeKey;
    activeSessions.set(conversationId, session);
    return {
      aiText: conversationScript[currentNodeKey].fallbackText,
      newState: currentNodeKey
    };
  }
  
  let nextAiText = currentNode.aiText;
  let nextState = currentNode.nextState || 'initial_belief';
  
  // Keyword branching logic
  if (currentNode.keywords) {
    let keywordMatch = false;
    for (const rule of currentNode.keywords) {
      if (rule.match.some(keyword => sanitizedMessage.includes(keyword))) {
        nextAiText = rule.aiText;
        nextState = rule.nextState;
        keywordMatch = true;
        break;
      }
    }
    if (!keywordMatch) {
        nextAiText = currentNode.fallbackText || nextAiText;
        nextState = currentNode.nextState || 'initial_belief';
    }
  }

  // Update state
  session.currentState = nextState;
  activeSessions.set(conversationId, session);

  return {
    aiText: nextAiText,
    newState: session.currentState
  };
}

