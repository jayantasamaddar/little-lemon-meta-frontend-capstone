import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logo.css';

export const Logo = ({
  className,
  src = 'https://via.placeholder.com/291x60?text=Logo',
  height = '60px',
  width,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`logo LL-Logo ${className ?? ''}`}
      onClick={() => navigate('/')}
      style={{ height, width }}
      role="banner"
    >
      <img src={src} alt="Little Lemon - Logo" title="Little Lemon - Home" />
    </div>
  );
};
