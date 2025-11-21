import React, { useState, useEffect, useRef } from 'react';
import socratesAvatar from '../assets/SocratesIMG.jpg';
import logoImage from '../assets/SocraticAILogo.png'; 

/**
 * The main chat interface.
 * @param {object} props
 * @param {Array} props.messages - Chat messages.
 * @param {function} props.onSendMessage - Send handler.
 * @param {function} props.toggleHistory - Handler to toggle the side menu.
 */
function ChatWindow({ messages, onSendMessage, toggleHistory }) {
  const [inputValue, setInputValue] = useState('');
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      const { scrollHeight } = messageListRef.current;
      messageListRef.current.scrollTo(0, scrollHeight);
    }
  }, [messages]);

  const handleSubmit = () => {
    if (inputValue.trim() === '') return; 
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="chat-window">
      <header className="chat-header">
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-btn" 
          onClick={toggleHistory}
          aria-label="Open menu"
        >
          ☰
        </button>

        
        <div className="brand-container">
          <img src={logoImage} alt="Socratic AI Logo" className="app-logo" />
        </div>
        
        <div 
          className="login-icon" 
          title="Login/Sign up" 
          aria-label="Login or Sign up"
        >
          👤
        </div>
      </header>
      
      <div className="message-list" ref={messageListRef}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender}`}
          >
              {message.sender === 'ai' && (
              <img 
                src={socratesAvatar} 
                alt="Socrates" 
                className="socrates-icon" 
              />
            )}
            
            <div className={`messageai ${message.sender}`}>
              <pre>{message.text}</pre>
            </div>
          </div>
        ))}
      </div>
      
      <div className="chat-input-area">
        <input 
          type="text" 
          placeholder="Examine your belief..."
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyPress={handleKeyPress} 
          aria-label="Chat input"
        />
        <button 
          className="send-btn"
          title="Send chat" 
          onClick={handleSubmit} 
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </main>
  );
}

export default ChatWindow;