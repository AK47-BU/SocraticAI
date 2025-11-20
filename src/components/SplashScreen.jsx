import React from 'react';
import LiquidChrome from './LiquidChrome';
import StarBorder from './StarBorder';
import logoImage from '../assets/SocraticAISplash.png';

const SplashScreen = ({ onStart }) => {
  return (
    <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 9999,
        overflow: 'hidden',
        backgroundColor: '#FDFCF5' 
    }}>
      {/* Background Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <LiquidChrome
          baseColor={[0.77, 0.63, 0.35]} // Gold color in RGB [0-1]
          speed={0.4}
          amplitude={0.4}
          interactive={true}
        />
      </div>
      
      {/* Overlay Layer for Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        // Soft overlay to ensure text readability against liquid chrome
        background: 'radial-gradient(circle, rgba(253, 252, 245, 0.8) 0%, rgba(253, 252, 245, 0.4) 100%)'
      }}>
        <img 
            src={logoImage} 
            alt="Socratic AI" 
            style={{ 
                height: '180px', 
                marginBottom: '2rem',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' 
            }} 
        />
        <div onClick={onStart}>
            <StarBorder 
                as="button" 
                className="splash-button" 
                color="#C5A059" // Gold moving stars
                speed="3s"
            >
                <span style={{ 
                    fontFamily: "'Georgia', serif",
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                }}>
                    Enter the Academy
                </span>
            </StarBorder>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;