import React, { useState, useEffect, useRef } from 'react';

/**
 * A component that displays the main chat message list and input area.
 * @param {object} props
 * @param {Array<object>} props.messages - The array of message objects to display.
 * @param {function} props.onSendMessage - Callback function to send a new message.
 */
function ChatWindow({ messages, onSendMessage }) {
  
  /**
   * Local state to manage the content of the text input field.
   */
  const [inputValue, setInputValue] = useState('');
  
  /**
   * A React ref to hold a reference to the message list's DOM element
   * for auto-scrolling.
   */
  const messageListRef = useRef(null);

  /**
   * An effect hook that runs every time the 'messages' prop changes.
   * It scrolls the message list to the bottom to show the newest message.
   */
  useEffect(() => {
    if (messageListRef.current) {
      const { scrollHeight } = messageListRef.current;
      messageListRef.current.scrollTo(0, scrollHeight);
    }
  }, [messages]);

  /**
   * Handles the submission of a new message.
   * It validates the input, calls the onSendMessage prop, and clears the input field.
   */
  const handleSubmit = () => {
    // Prevent sending empty or whitespace-only messages
    if (inputValue.trim() === '') return; 
    
    onSendMessage(inputValue);
    setInputValue(''); // Reset the input field
  };

  /**
   * Handles key presses in the input field to allow sending with "Enter".
   * @param {React.KeyboardEvent} e - The keyboard event object.
   */
  const handleKeyPress = (e) => {
    // Send on "Enter" but allow "Shift+Enter" for new lines (if this were a textarea)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default form submission or newline
      handleSubmit();
    }
  };

  return (
    <main className="chat-window">
      <header className="chat-header">
        <h1>Socratic A.I.</h1>
        <div 
          className="login-icon" 
          title="Login/Sign up" 
          aria-label="Login or Sign up"
        >
          👤
        </div>
      </header>
      
      {/* The message list. 
        The 'ref' is attached here for auto-scrolling.
      */}
      <div className="message-list" ref={messageListRef}>
        {/* Map over the 'messages' prop to render each message */}
        {messages.map((message) => (
          <div 
            key={message.id} // Use a stable ID for React's reconciliation
            className={`message ${message.sender}`} // Applies 'ai' or 'user' class
          >
            {/* Use <pre> to preserve whitespace and newlines from the message text,
              which is crucial for the initial disclaimer prompt.
            */}
            <pre>{message.text}</pre>
          </div>
        ))}
      </div>
      
      {/* The main chat input */}
      <div className="chat-input-area">
        <div className="input-icon" title="Settings" aria-label="Settings">⚙️</div>
      
        <div className="input-icon" title="Help" aria-label="Get a hint">?</div>
        <div className="input-icon" title="Documentation" aria-label="Documentation">🔗</div>
        
        <input 
          type="text" 
          placeholder="Examine your belief..."
          value={inputValue} // Controlled component: value is tied to state
          onChange={(e) => setInputValue(e.target.value)} // Update state on change
          onKeyPress={handleKeyPress} // Handle "Enter" key
          aria-label="Chat input"
        />
        <button 
          title="Send chat" 
          onClick={handleSubmit} // Handle click to send
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </main>
  );
}

export default ChatWindow;