import React from 'react';
import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = 'SplashButton',
  color = 'white',
  speed = '1000s',
  thickness = 9,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        // CHANGED: Applied thickness to all sides (removed the '0' for left/right)
        padding: `${thickness}px`, 
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;