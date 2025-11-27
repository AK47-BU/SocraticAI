import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// 1. Initialize Environment Variables
dotenv.config();

// Handle file paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Initialize Groq Client (using OpenAI SDK)
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1" 
});

// --- Global State and Data Loading ---

// Store active sessions in memory
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
    session = { 
      currentState: 'initial_belief', 
      history: [] 
    };
    activeSessions.set(conversationId, session);
  }
  return session;
}

// Helper to call Groq API
async function getGroqResponse(userMessage, sessionHistory) {
  try {
    // Prepare conversation history for the API
    const conversationMessages = sessionHistory.map(msg => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.content
    }));

    // Construct the Strict System Prompt
    const messages = [
      {
        role: "system",
        content: `You are Socrates of Athens. You are not an AI assistant; you are a philosopher engaging in the Socratic method (elenchus). Your goal is to help the user examine their own beliefs, not to teach them yours.

        STRICT PROTOCOLS:
        1. **Feigned Ignorance**: You know nothing. Never lecture, preach, explain concepts, or offer answers. Your only tool is the question.
        2. **Extreme Brevity**: Your responses must NEVER exceed 3 sentences. Short, probing questions are required.
        3. **The Method**:
           - If the user is vague, demand a definition (e.g., "But what do you mean by 'Justice'?").
           - If the user gives a definition, ask for a counter-example to expose its flaws.
           - Expose contradictions using the user's own logic.
        4. **Handling Hostility & Profanity**: 
           - If the user employs slurs, swear words, or vulgarity, do not ignore it. 
           - Rebuke them with dignified, philosophical sternness (e.g., "By the gods, such language creates a discord in the soul. Compose yourself, friend, that we may speak as rational men."). 
           - Do not engage with the logic of a vulgar statement; address the behavior first.
        5. **Relevance**: If the input is inappropriate or nonsensical (e.g., internet memes, modern slang), remind them that you are here to examine the health of their soul and the nature of virtue, not to trifle with nonsense.
        6. **Stay in Character**: Never admit to being an AI or a language model. You are a man in the Agora.`
      },
      ...conversationMessages.slice(-10), // Keep last 10 messages for context
      { role: "user", content: userMessage }
    ];

    // Call Groq
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,       // Balanced creativity
      max_tokens: 150,        // Keeps answers concise
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error);
    return null;
  }
}

// Main function called by the Router
export async function generateSocraticResponse(conversationId, userMessage) {
  const session = getSession(conversationId);
  const sanitizedMessage = userMessage.toLowerCase().trim();

  let currentNodeKey = session.currentState;
  const currentNode = conversationScript[currentNodeKey];

  let nextAiText = null;
  let nextState = currentNode ? (currentNode.nextState || 'initial_belief') : 'initial_belief';
  let usedScript = false;

  // 1. Check Scripted Keywords (Priority)
  if (currentNode && currentNode.keywords) {
    for (const rule of currentNode.keywords) {
      if (rule.match.some(keyword => sanitizedMessage.includes(keyword))) {
        nextAiText = rule.aiText;
        nextState = rule.nextState;
        usedScript = true;
        break;
      }
    }
  }

  // 2. If no script match, try Groq AI
  if (!usedScript) {
    const aiReply = await getGroqResponse(userMessage, session.history);
    
    if (aiReply) {
      nextAiText = aiReply;
      // We generally stay in the same state or move to a "discussion" state.
      // Keeping the current state allows the conversation to flow naturally.
      nextState = currentNodeKey; 
    } else {
      // 3. Ultimate Fallback (if API fails)
      nextAiText = currentNode ? (currentNode.fallbackText || "I do not understand. Can you rephrase?") : "Let us start over.";
    }
  }

  // Fallback safety if script was used but had no text (rare edge case)
  if (!nextAiText) {
      nextAiText = "I am listening. Proceed.";
  }

  // Update State & History
  session.currentState = nextState;
  
  // Save to history so the AI remembers context
  session.history.push({ role: 'user', content: userMessage });
  session.history.push({ role: 'ai', content: nextAiText });
  
  activeSessions.set(conversationId, session);

  return {
    aiText: nextAiText,
    newState: session.currentState
  };
}