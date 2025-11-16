import React from 'react';

/**
 * A component to display chat history and session controls.
 * @param {object} props
 * @param {boolean} props.isHistoryOpen - Controls the visibility of the panel content.
 * @param {function} props.toggleHistory - Callback function to toggle the panel.
 * @param {function} props.onNewChat - Callback function to reset the chat.
 */
function ChatHistory({ isHistoryOpen, toggleHistory, onNewChat }) {
  return (
    <div className="chat-history">
      <div className="history-header">
        {/* Conditionally render the title only when the panel is open */}
        {isHistoryOpen && <h3>Previous chat history</h3>}
        
        {/* Container for all control buttons */}
        <div className="history-controls">
          {/* Conditionally render the "New Chat" button */}
          {isHistoryOpen && (
            <button 
              onClick={onNewChat} 
              title="New Chat" 
              aria-label="Start a new chat"
            >
              +
            </button>
          )}
          
          {/* Toggles the panel open/closed */}
          <button 
            onClick={toggleHistory} 
            title="Toggle chat history"
            aria-label="Toggle chat history panel"
          >
            {isHistoryOpen ? '←' : '→'}
          </button>
        </div>
      </div>

      {/* Conditionally render the chat list */}
      {isHistoryOpen && (
        <ul className="history-list">
          {/* These are static placeholders for UI demonstration */}
          <li>What is justice?</li>
          <li>On Virtue</li>
          <li>The Allegory of the Cave</li>
        </ul>
      )}
    </div>
  );
}

export default ChatHistory;