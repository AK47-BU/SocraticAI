import { useState } from 'react';
import ChatHistory from './components/ChatHistory';
import ChatWindow from './components/ChatWindow';

/**
 * The initial message object that starts every new conversation.
 * Includes the NFR-901 disclaimer and the first Socratic prompt.
 */
const INITIAL_MESSAGE = {
  id: 1,
  sender: 'ai',
  text: "Greetings. I am a simulation of Socrates. Please be aware that you are interacting with an AI and not a real person. \n\nLet us begin. Tell me, what is a belief you hold to be true?"
};

function App() {
  /**
   * State to manage the visibility of the ChatHistory panel.
   * This is controlled by the toggleHistory function.
   */
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  
  /**
   * Main state for the application. Holds the entire array of message objects
   * for the current chat session. (Implements FR-303)
   * This state is "lifted" so that both ChatHistory (to reset) and ChatWindow (to display)
   * can interact with it.
   */
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  /**
   * Toggles the boolean state of isHistoryOpen.
   * Passed as a prop to ChatHistory.
   */
  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  /**
   * Resets the chat session to its initial state. (Implements FR-203)
   * Passed as a prop to ChatHistory.
   */
  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  /**
   * Handles adding a new user message and simulating a backend response.
   * Passed as a prop to ChatWindow. (Implements FR-201)
   * @param {string} userMessage - The text content from the user's input.
   */
  const handleSendMessage = (userMessage) => {
    // Create a new message object for the user
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: userMessage,
    };
    
    // Update the state by appending the new user message.
    // We use the functional form of setState to ensure we have the latest state.
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // --- Backend Simulation (Implements NFR-102) ---
    // This block simulates an asynchronous API call to an Express backend.
    // In production, replace this with a 'fetch' or 'axios' call.
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2, // Note: This ID generation is not robust for production
        sender: 'ai',
        // Provides a generic Socratic response (Implements NFR-801)
        text: "An interesting point. But what leads you to that conclusion?"
      };
      // Append the simulated AI response to the message list
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000); // 1-second delay to simulate network latency
  };

  return (
    <div 
      // Dynamically sets the CSS class based on the history panel's state.
      // This allows CSS to control the collapsible panel's styling.
      className={`app-container ${isHistoryOpen ? 'history-open' : 'history-closed'}`}
    >
      <ChatHistory 
        isHistoryOpen={isHistoryOpen} 
        toggleHistory={toggleHistory} 
        onNewChat={handleNewChat} 
      />
      <ChatWindow 
        messages={messages} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
}

export default App;