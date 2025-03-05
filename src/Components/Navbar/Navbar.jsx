import React from 'react'
import './Navbar.css'
import Logo from '../../assets/Logo.PNG'
const Navbar = () => {
  return (
    <nav className='container'>
        <img src={Logo} alt="" className='logo'/>
        <ul>
            <li><button className='btn' onClick={() => window.location.reload()}>Accueil</button></li>
            <li><button className='btn'>À propos</button></li>
            <li><button className='btn'>Statistiques</button></li>
            <li><button className='btn'>Avis</button></li>
            <li><button className='btn'>Contact & Aide </button></li>
        </ul>
        <div className="right-section">
        <button className="btn login-btn">Se connecter</button>
      </div>
    </nav>
  )
}

export default Navbar