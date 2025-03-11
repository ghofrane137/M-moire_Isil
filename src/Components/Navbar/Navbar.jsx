import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // Importez ScrollLink
import "./Navbar.css";
import Logo from "../../assets/Logo.PNG";
import LoginContainer from "../Login/LoginContainer";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${scrolling ? "scrolled" : ""}`}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img className="logo" src={Logo} alt="logo..." />
          </a>

          {/* Bouton pour ouvrir/fermer le menu */}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu avec état ouvert/fermé */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <ScrollLink
                  to="hero" // ID de la section cible
                  smooth={false} // Défilement fluide
                  duration={500} // Durée du défilement
                  offset={-15} // Ajustement pour la hauteur de la navbar
                  className={`nav-link px-4 ${menuOpen ? "active-link" : ""}`}
                  onClick={closeMenu}
                >
                  Accueil
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="about"
                  smooth={false}
                  duration={500}
                  offset={-200}
                  className={`nav-link px-4 ${menuOpen ? "active-link" : ""}`}
                  onClick={closeMenu}
                >
                  À propos
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="statistique"
                  smooth={false}
                  duration={500}
                  offset={-150}
                  className={`nav-link px-4 ${menuOpen ? "active-link" : ""}`}
                  onClick={closeMenu}
                >
                  Statistiques
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="slider-container"
                  smooth={false}
                  duration={500}
                  offset={-150}
                  className={`nav-link px-4 ${menuOpen ? "active-link" : ""}`}
                  onClick={closeMenu}
                >
                  Avis
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="contact"
                  smooth={false}
                  duration={500}
                  offset={-150}
                  className={`nav-link px-4 ${menuOpen ? "active-link" : ""}`}
                  onClick={closeMenu}
                >
                  Contact & Aide
                </ScrollLink>
              </li>
            </ul>

            {/* Bouton de connexion */}
            <div className="d-flex">
              <button className="btn login-btn" onClick={togglePopup}>
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Popup de connexion */}
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <LoginContainer onClose={togglePopup} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;