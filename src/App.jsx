import { useState } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';

const INITIAL_MESSAGE = {
  id: 1,
  sender: 'ai',
  text: "Greetings. I am a simulation of Socrates. Please be aware that you are interacting with an AI and not a real person. \n\nLet us begin. Tell me, what is a belief you hold to be true?"
};

function App() {
  // Default to closed to keep the UI clean and focused
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE]);
    // Close menu on mobile after selection
    if (window.innerWidth < 768) setIsHistoryOpen(false);
  };

  const handleSendMessage = (userMessage) => {
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: userMessage,
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    setTimeout(() => {
      constAiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: "An interesting point. But what leads you to that conclusion?"
      };
      setMessages(prevMessages => [...prevMessages, constAiResponse]);
    }, 1000); 
  };

  return (
    <div className={`app-container ${isHistoryOpen ? 'history-open' : 'history-closed'}`}>
      <ChatHistory 
        isHistoryOpen={isHistoryOpen} 
        onNewChat={handleNewChat} 
      />
      <ChatWindow 
        messages={messages} 
        onSendMessage={handleSendMessage}
        toggleHistory={toggleHistory} 
      />
    </div>
  );
}

export default App;