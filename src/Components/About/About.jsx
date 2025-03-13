import React,{ useState } from 'react';
import './About.css';
import about_img from '../../assets/about.jpg';
import LoginContainer from "../../Components/Login/LoginContainer"


const About = () => {


  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
    <div className='about container my-5'> {/* Ajout de container pour l'espacement */}
      <div className='row align-items-center'>

        {/* Image à gauche */}
        <div className='col-md-4 text-center'>
          <img src={about_img} alt="À propos" className='img-fluid rounded about-img' />
        </div>

        {/* Texte à droite */}
        <div className='col-md-8 text-center text-md-start'>
          <div className='about-body'>
            <h3 className='about-title'>À PROPOS DE UNIHUB 🌍📚</h3>
            <h2>Bienvenue sur UNIHUB !</h2>
            <p>Un espace dédié au partage et à l’accès aux ressources pédagogiques pour enseignants et étudiants
            Notre mission est de faciliter l’apprentissage en offrant une bibliothèque numérique interactive où chacun peut découvrir, partager et organiser du contenu éducatif de qualité.</p>
            <div className="d-flex">
              <button className="btn login-btn" onClick={togglePopup}>
                Se connecter
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

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
}

export default About;
