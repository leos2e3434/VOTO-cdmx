import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src="https://www.ine.mx/assets/images/portal-ine.svg" alt="INE Logo" className="logo" />
      <button className="connect-button">Conectar</button>
    </header>
  );
};

export default Header;
