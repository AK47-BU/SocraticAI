import React from 'react';

function ChatHistory({ 
  isHistoryOpen, 
  onNewChat, 
  onOpenHelp, 
  onOpenSettings, 
  history, 
  onLoadChat,
  activeChatId // <--- Receive the prop
}) {
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
            {history.length === 0 ? (
              <li style={{ fontStyle: 'italic', cursor: 'default' }}>No records yet...</li>
            ) : (
              history.map((chat) => (
                <li 
                  key={chat.id} 
                  onClick={() => onLoadChat(chat)}
                  // ADD THIS CLASS LOGIC
                  className={chat.id === activeChatId ? 'active' : ''}
                >
                  {chat.title || "Untitled Inquiry"} 
                  <br/>
                  <small style={{ fontSize: '0.7em', opacity: 0.7 }}>
                    {new Date(chat.date).toLocaleDateString()}
                  </small>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="menu-footer">
          <button className="footer-link" onClick={onOpenSettings}>
            ⚙️ Settings
          </button>
          <button className="footer-link" onClick={onOpenHelp}>
            Help 
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ChatHistory;