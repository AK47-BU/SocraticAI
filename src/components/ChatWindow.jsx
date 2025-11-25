import React, { useState, useEffect, useRef } from 'react';
import socratesAvatar from '../Assets/SocratesIMG.jpg';
import logoImage from '../Assets/SocraticAILogo.png'; 

function ChatWindow({ messages, onSendMessage, toggleHistory, onLoginClick, user }) {
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
        
        <button 
          className="login-icon" 
          onClick={onLoginClick}
          title={user ? `Signed in as ${user.name}` : "Login"}
          aria-label="Login"
          style={{ 
            background: user ? 'var(--color-olive)' : 'transparent',
            color: user ? 'white' : 'var(--color-gold)',
            fontSize: user ? '1rem' : '1.2rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px solid var(--color-gold)',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center'
          }} 
        >
          {user ? user.name.charAt(0).toUpperCase() : '👤'}
        </button>
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
            
            <div className={`message-text ${message.sender}`}>
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