JavaScript
import express from 'express';
import { generateSocraticResponse } from '../logic/chatLogic.js';

const router = express.Router();

router.post('/chat', (req, res) => {
  const { userMessage, conversationId } = req.body; 

  if (!userMessage || !conversationId) {
    return res.status(400).json({ error: 'Missing userMessage or conversationId' });
  }

  try {
    const response = generateSocraticResponse(conversationId, userMessage);
    
    // Simulate thinking time
    setTimeout(() => {
      res.json(response); 
    }, 500); 

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
        aiText: "My apologies, I perceive an internal error. What is a belief you hold to be true?",
        newState: 'initial_belief'
    });
  }
});

export default router;
