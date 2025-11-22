import { useState, useCallback } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';
import SplashScreen from './components/SplashScreen';
import HelpModal from "./components/HelpModal";

// --- Constants & Helpers ---

// Helper function to generate unique IDs for messages
const generateId = () => Math.random().toString(36).substring(2, 9);

// The address of Express Backend
const API_URL = 'http://localhost:3001/api/chat';

const INITIAL_MESSAGE = {
  id: generateId(),
  sender: 'ai',
  text: "Greetings. I am a simulation of Socrates. Please be aware that I am an AI, and thus I know nothing—except that I know nothing.\n\nLet us examine your mind. Tell me, what is a belief you hold to be true? (e.g., 'Justice is fairness', 'Virtue can be taught')"
};

function App() {
  // --- UI State ---
  const [showSplash, setShowSplash] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // --- Chat Logic State ---
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [conversationId, setConversationId] = useState(generateId()); // Session ID for the backend
  const [isLoading, setIsLoading] = useState(false); // Prevents double-sending

  // --- Handlers ---

  const handleEnterApp = () => {
    setShowSplash(false);
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  /**
   * Starts a fresh chat session.
   * Resets UI and generates a new backend session ID.
   */
  const handleNewChat = useCallback(() => {
    setConversationId(generateId()); // New backend session
    setMessages([INITIAL_MESSAGE]);  // Reset UI
    setIsLoading(false);
    
    // UX: Close history menu automatically on mobile when starting new chat
    if (window.innerWidth < 768) setIsHistoryOpen(false); 
  }, []);

  /**
   * Handles sending the user's message to the API.
   * @param {string} userMessage - The text input from the user.
   */
  const handleSendMessage = async (userMessage) => {
    // Prevent sending if already waiting for a reply
    if (isLoading) return;

    // 1. Update UI with user's message
    const newUserMessage = {
      id: generateId(),
      sender: 'user',
      text: userMessage,
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      // 2. Send data to Express Backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: userMessage,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // 3. Get the AI's response data
      const data = await response.json();
      
      const aiResponse = {
        id: generateId(),
        sender: 'ai',
        text: data.aiText, 
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      
      // Fallback if backend is offline
      const errorResponse = {
        id: generateId(),
        sender: 'ai',
        text: "My apologies, I seem to have lost my connection to the ether. Please ensure the backend server is running.",
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
      
    } finally {
      setIsLoading(false);
    }
  };

  // --- Rendering ---

  // 1. Render Splash Screen if state is true
  if (showSplash) {
    return <SplashScreen onStart={handleEnterApp} />;
  }

  // 2. Render Main App
  return (
    <div className={`app-container ${isHistoryOpen ? 'history-open' : 'history-closed'}`}>
      
      <ChatHistory 
        isHistoryOpen={isHistoryOpen} 
        onNewChat={handleNewChat} 
        onOpenHelp={() => setIsHelpOpen(true)} 
        toggleHistory={toggleHistory} // Passed here in case close button is inside History
      />

      <ChatWindow 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        toggleHistory={toggleHistory} // Passed here in case Burger button is inside Window
        isLoading={isLoading} // Optional: Pass to show a spinner in ChatWindow
      />

      {/* 3. Render the Modal if state is true */}
      {isHelpOpen && (
        <HelpModal onClose={() => setIsHelpOpen(false)} />
      )}
      
    </div>
  );
}

export default App;