import React from 'react';
import './Hero.css';
import Typewriters from './Typewriters';
import hero from "../../assets/hero.png";

export const Hero = () => {
  return (
    <div className='hero mb-4 container'>
      <div className='row align-items-center'>

        {/* Texte à gauche */}
        <div className='col-md-6 text-center text-md-start'>
          <div className='hero-body'>
            <h1 className='hero-title'>Le savoir à portée de main 📚✨</h1>
            <p className='hero-text'>
              <Typewriters />
            </p>
          </div>
        </div>

        {/* Image à droite */}
        <div className='col-md-6 text-center'>
          <img src={hero} className="img-fluid hero-img" alt="hero" />
        </div>

      </div>
    </div>
  );
};

export default Hero;
