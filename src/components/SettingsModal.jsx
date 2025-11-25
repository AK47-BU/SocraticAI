import React from 'react';

const SettingsModal = ({ onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <header className="modal-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        
        <div className="modal-body">
          <section>
            <h3>Display</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Dark Mode</span>
              <input type="checkbox" disabled title="Coming soon" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Text Size</span>
              <select style={{ padding: '5px' }}>
                <option>Normal</option>
                <option>Large</option>
              </select>
            </div>
          </section>

          <section>
            <h3>Data</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Clear Local History</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('socratic_history');
                  window.location.reload();
                }}
                style={{ 
                  padding: '5px 10px', 
                  background: '#C06C55', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear Data
              </button>
            </div>
          </section>
        </div>
        
        <footer className="modal-footer">
          <button className="primary-btn" onClick={onClose}>Save & Close</button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;