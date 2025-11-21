import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chatRouter.js'; 

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Connect the router
app.use('/api', chatRouter); 

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});