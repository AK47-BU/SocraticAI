import React, { useState } from 'react';

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');

  // Close on background click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login: Extract name from email or use default
    const name = email.split('@')[0] || "Student";
    onLogin({ name: name, email });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <header className="modal-header">
          <h2>Identify Yourself</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        
        <div className="modal-body">
          <p style={{ marginBottom: '20px' }}>
            "Know thyself," as the oracle says. Please enter your details to continue your journey.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
              <input 
                type="password" 
                placeholder="••••••"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            
            <button type="submit" className="primary-btn" style={{ marginTop: '10px' }}>
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;