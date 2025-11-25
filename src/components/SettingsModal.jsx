import React from 'react';

const SettingsModal = ({ onClose, theme, setTheme, textSize, setTextSize }) => {
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Dark Mode</span>
              <label className="switch" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={theme === 'dark'} 
                  onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                  style={{ transform: 'scale(1.5)', accentColor: '#556B2F' }}
                />
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Text Size</span>
              <select 
                value={textSize} 
                onChange={(e) => setTextSize(e.target.value)}
                style={{ 
                  padding: '8px', 
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  background: 'var(--color-bg-input)',
                  color: 'var(--color-text-main)',
                  fontSize: '1rem'
                }}
              >
                <option value="normal">Normal</option>
                <option value="large">Large</option>
              </select>
            </div>
          </section>

          <section>
            <h3>Data</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Clear Local History</span>
              <button 
                onClick={() => {
                  if(confirm("Are you sure you want to delete all chat history?")) {
                    localStorage.removeItem('socratic_history');
                    window.location.reload();
                  }
                }}
                style={{ 
                  padding: '8px 15px', 
                  background: '#C06C55', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Clear Data
              </button>
            </div>
          </section>
        </div>
        
        <footer className="modal-footer">
          <button className="primary-btn" onClick={onClose}>Done</button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;