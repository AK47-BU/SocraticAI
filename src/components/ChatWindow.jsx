import React from 'react';

function ChatWindow() {
  return (
    <main className="chat-window">
      <header className="chat-header">
        <h1>Socratic A.I.</h1>
        <div className="login-icon" title="Login/Sign up">👤</div>
      </header>
      
      <div className="message-list">
        <div className="message ai">
          Hello! I am Socratic AI. Ask me a question, and I will help you think through it.
        </div>
        <div className="message user">
          What is justice?
        </div>
        <div className="message ai">
          A challenging question! Plato, in "The Republic," suggests justice is harmony in the soul and state. What are your thoughts on that?
        </div>
        <div className="message user">
          That sounds reasonable, but how does it apply to individuals?
        </div>
      </div>
      
      <div className="chat-input-area">
        
        <div className="input-icon" title="Settings">⚙️</div>
        <div className="input-icon" title="Help">?</div>
        <div className="input-icon" title="Documentation">🔗</div>
        
        
        <input type="text" placeholder="Ask a question..." />
        <button title="Send chat">↑</button>
      </div>
    </main>
  );
}

export default ChatWindow;