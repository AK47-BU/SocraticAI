import express from 'express';
import { generateSocraticResponse } from '../logic/chatlogic.js'; 

const router = express.Router();

router.post('/chat', async (req, res) => { // Added 'async' here
  const { userMessage, conversationId } = req.body; 

  if (!userMessage || !conversationId) {
    return res.status(400).json({ error: 'Missing userMessage or conversationId' });
  }

  try {
    // Await the response from the logic function
    const response = await generateSocraticResponse(conversationId, userMessage);
    
    res.json(response); 

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
        aiText: "My apologies, I perceive an internal error. What is a belief you hold to be true?",
        newState: 'initial_belief'
    });
  }
});

export default router;
