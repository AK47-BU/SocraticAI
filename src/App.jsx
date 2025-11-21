import { useState } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';
import SplashScreen from './components/SplashScreen';
import HelpModal from "./components/HelpModal";

const INITIAL_MESSAGE = {
  id: 1,
  sender: 'ai',
  text: "Greetings. I am a simulation of Socrates. Please be aware that you are interacting with an AI and not a real person. \n\nLet us begin. Tell me, what is a belief you hold to be true?"
};

function App() {
  // State to track if splash screen is visible
  const [showSplash, setShowSplash] = useState(true);
  
  // Menu state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleEnterApp = () => {
    setShowSplash(false);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE]);
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
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: "An interesting point. But what leads you to that conclusion?"
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000); 
  };

  // Render Splash Screen if state is true
  if (showSplash) {
    return <SplashScreen onStart={handleEnterApp} />;
  }

  // Render Main App if state is false
  return (
    <div className={`app-container ${isHistoryOpen ? 'history-open' : 'history-closed'}`}>
      <ChatHistory 
        isHistoryOpen={isHistoryOpen} 
        onNewChat={handleNewChat}
        onOpenHelp={() => setIsHelpOpen(true)} 
      />
      <ChatWindow 
        messages={messages} 
        onSendMessage={handleSendMessage}
        toggleHistory={toggleHistory}    
      />
      {/* 4. Render the Modal if state is true */}
      {isHelpOpen && (
        <HelpModal onClose={() => setIsHelpOpen(false)} />
        )}
    </div>
  );
}

export default App;