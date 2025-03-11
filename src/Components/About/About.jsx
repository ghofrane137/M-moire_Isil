import React from 'react'
import './About.css'
import about_img from '../../assets/about.jpg'

 const About = () => {
  return (
    <div className='about' >
        <div className='about-left'>
            <img src ={about_img} alt="" className='about_img'/>

        </div>
        <div className='about-right'>
            <h3>À PROPOS DE UNIHUB🌍📚</h3>
            <h2>Bienvenue sur UNIHUB!</h2>
            <p>Un espace dédié au partage et à l’accès aux ressources pédagogiques pour enseignants et étudiants.</p>
            <p>Notre mission est de faciliter l’apprentissage en offrant une bibliothèque numérique interactive où chacun peut découvrir, partager et organiser du contenu éducatif de qualité.</p>
            <button className="btn login-btn">Se connecter</button>
        </div>
        
    </div>
  )
}
export default About;
