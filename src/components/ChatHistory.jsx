import React from 'react';

function ChatHistory({ isHistoryOpen, toggleHistory }) {
  return (
    <div className="chat-history">
      <div className="history-header">
        {isHistoryOpen && <h3>Previous chat history</h3>}
        
        
        <button onClick={toggleHistory} title="Toggle chat history">
          {isHistoryOpen ? '←' : '→'}
        </button>
      </div>

      {isHistoryOpen && (
        <ul className="history-list">
          <li>Previous Chat 1</li>
          <li>Socrates on Ethics</li>
          <li>The Allegory of the Cave</li>
        </ul>
      )}
    </div>
  );
}

export default ChatHistory;