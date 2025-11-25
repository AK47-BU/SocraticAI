import { useState, useCallback, useEffect } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';
import SplashScreen from './components/SplashScreen';
import HelpModal from "./components/HelpModal";
import LoginModal from "./components/LoginModal";
import SettingsModal from "./components/SettingsModal";

// --- Constants & Helpers ---
const generateId = () => Math.random().toString(36).substring(2, 9);
const API_URL = 'http://localhost:3001/api/chat';

const INITIAL_MESSAGE = {
  id: 'init-0',
  sender: 'ai',
  text: "Greetings. I am a simulation of Socrates. Please be aware that I am an AI, and thus I know nothing—except that I know nothing.\n\nLet us examine your mind. Tell me, what is a belief you hold to be true? (e.g., 'Justice is fairness', 'Virtue can be taught')"
};

function App() {
  // --- UI State ---
  const [showSplash, setShowSplash] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'help', 'login', 'settings' or null
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [user, setUser] = useState(null);

  // --- Chat Logic State ---
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [conversationId, setConversationId] = useState(generateId());
  const [isLoading, setIsLoading] = useState(false);
  
  // Load history from local storage
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem('socratic_history');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Handlers ---

  const handleEnterApp = () => setShowSplash(false);
  const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

  // Helper to save current chat before switching
  const saveCurrentChat = () => {
    // Only save if there is real interaction (more than 1 message)
    if (messages.length > 1) {
      const userFirstMsg = messages.find(m => m.sender === 'user');
      const title = userFirstMsg ? userFirstMsg.text.slice(0, 30) + "..." : "Untitled";
      
      const newHistoryItem = {
        id: conversationId,
        date: new Date().toISOString(),
        title: title,
        messages: messages
      };

      const updatedHistory = [newHistoryItem, ...chatHistory];
      setChatHistory(updatedHistory);
      localStorage.setItem('socratic_history', JSON.stringify(updatedHistory));
    }
  };

  const handleNewChat = useCallback(() => {
    saveCurrentChat();
    setConversationId(generateId());
    setMessages([INITIAL_MESSAGE]);
    setIsLoading(false);
    if (window.innerWidth < 768) setIsHistoryOpen(false); 
  }, [messages, chatHistory, conversationId]);

  const handleLoadChat = (savedChat) => {
    saveCurrentChat(); // Save the one we are leaving
    setConversationId(savedChat.id);
    setMessages(savedChat.messages);
    if (window.innerWidth < 768) setIsHistoryOpen(false);
  };

  const handleSendMessage = async (userMessage) => {
    if (isLoading) return;

    const newUserMessage = { id: generateId(), sender: 'user', text: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, conversationId }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      setMessages(prev => [...prev, { id: generateId(), sender: 'ai', text: data.aiText }]);
      
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setMessages(prev => [...prev, { 
        id: generateId(), 
        sender: 'ai', 
        text: "My apologies, I seem to have lost my connection to the ether. Please ensure the backend server is running." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Rendering ---
  if (showSplash) return <SplashScreen onStart={handleEnterApp} />;

  return (
    <div className={`app-container ${isHistoryOpen ? 'history-open' : 'history-closed'}`}>
      
      <ChatHistory 
        isHistoryOpen={isHistoryOpen} 
        onNewChat={handleNewChat} 
        onOpenHelp={() => setActiveModal('help')}
        onOpenSettings={() => setActiveModal('settings')}
        history={chatHistory}
        onLoadChat={handleLoadChat}
      />

      <ChatWindow 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        toggleHistory={toggleHistory}
        onLoginClick={() => setActiveModal('login')}
        user={user}
        isLoading={isLoading} 
      />

      {/* Modals */}
      {activeModal === 'help' && (
        <HelpModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'login' && (
        <LoginModal 
          onClose={() => setActiveModal(null)} 
          onLogin={setUser} 
        />
      )}
      {activeModal === 'settings' && (
        <SettingsModal onClose={() => setActiveModal(null)} />
      )}
      
    </div>
  );
}

export default App;