import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import './Typewriters.css'; // Ajout du fichier CSS pour le style

function Typewriters() {
    const [text] = useTypewriter({
        words: ['Découvre', 'Partage', 'Apprends'],
        loop: true,
        typeSpeed: 50,
        deleteSpeed: 40,
    });

    return (
        <div className="typewriter-container ms"> 
            <h1 className="typewriter-text">
                <span className="animated-text">{text}</span>
                <Cursor />
            </h1>
            <p className="subtitle">
                avec des ressources de qualité, créées par <br/>et pour les étudiants et enseignants !
            </p>
        </div>
    );
}

export default Typewriters;
