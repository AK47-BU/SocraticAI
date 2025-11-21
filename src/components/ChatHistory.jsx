import React from 'react';

function ChatHistory({ isHistoryOpen, onNewChat, onOpenHelp }) {
  return (
    <aside className="chat-history" aria-hidden={!isHistoryOpen}>
      <div className="menu-content">
        <div className="menu-header">
          <h3>Menu</h3>
        </div>

        <div className="menu-actions">
          <button className="menu-btn" onClick={onNewChat}>
            <span>+</span> Start New Inquiry
          </button>
        </div>

        <div className="history-section">
          <div className="menu-header">
             <h3>Previous Inquiries</h3>
          </div>
          <ul className="history-list">
            <li>What is justice?</li>
            <li>On Virtue</li>
            <li>The Allegory of the Cave</li>
          </ul>
        </div>

        <div className="menu-footer">
          <button className="footer-link">⚙️ Settings</button>
          <button 
            className="footer-link" 
            onClick={onOpenHelp}
          >
            Help 
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ChatHistory;