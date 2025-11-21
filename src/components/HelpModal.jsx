import React from 'react';


const HelpModal = ({ onClose }) => {
  // Close on background click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <header className="modal-header">
          <h2>Socratic AI Guide</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        
        <div className="modal-body">
          <section>
            <h3>What is Socratic AI?</h3>
            <p>
              This application simulates the dialectical method of Socrates. 
              It is designed not to give you answers, but to help you examine 
              the validity of your own beliefs through questioning.
            </p>
          </section>

          <section>
            <h3>How to Participate</h3>
            <ul>
              <li><strong>State a Thesis:</strong> Begin by entering a belief you hold true (e.g., "Justice is equality").</li>
              <li><strong>Answer Honestly:</strong> The AI will ask follow-up questions. Answer them as clearly as possible.</li>
              <li><strong>Reflect:</strong> Use the transcript to review your logic.</li>
            </ul>
          </section>

          <section className="note-section">
            <small>
              <em>Note: This is an AI simulation. Conversations are for educational purposes.</em>
            </small>
          </section>
        </div>
        
        <footer className="modal-footer">
          <button className="primary-btn" onClick={onClose}>Return to Inquiry</button>
        </footer>
      </div>
    </div>
  );
};

export default HelpModal;