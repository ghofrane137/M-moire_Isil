import React, { useState } from 'react';
import { Link } from "react-scroll";
import './Navbar.css';
import Logo from '../../assets/Logo.PNG';
import menu_icon from '../../assets/menu_icon.png';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav>
      <img src={Logo} alt="Logo" className='logo' />

      {/* Liste des liens */}
      <ul className={mobileMenu ? "mobile-menu" : ""}>
        <li><Link to="hero" smooth={true} offset={-15} duration={500} className="btn" onClick={toggleMenu}>Accueil</Link></li>
        <li><Link to="about" smooth={true} offset={-200} duration={500} className="btn" onClick={toggleMenu}>À propos</Link></li>
        <li><Link to="statistique" smooth={true} offset={-150} duration={500} className="btn" onClick={toggleMenu}>Statistiques</Link></li>
        <li><Link to="slider-container" smooth={true} offset={-150} duration={500} className="btn" onClick={toggleMenu}>Avis</Link></li>
        <li><Link to="contact" smooth={true} offset={-150} duration={500} className="btn" onClick={toggleMenu}>Contact & Aide</Link></li>
        {/* Bouton Se connecter pour mobile */}
        <li className="mobile-login"><button className="btn login-btn">Se connecter</button></li>
      </ul>

      {/* Section bouton "Se connecter" en dehors du menu mobile (version desktop) */}
      <div className="right-section">
        <button className="btn login-btn">Se connecter</button>
      </div>

      {/* Icône du menu burger */}
      <img
        src={menu_icon}
        alt="Menu"
        className={`menu-icon ${mobileMenu ? "hide-menu-icon" : ""}`} // Masquer l'icône lorsque le menu est ouvert
        onClick={toggleMenu}
      />
    </nav>
  );
}

export default Navbar;