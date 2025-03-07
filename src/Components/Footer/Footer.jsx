import React, { useState } from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';
import { FaStar } from "react-icons/fa";
import { Link } from "react-scroll";
import emailjs from 'emailjs-com';

const Footer = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState(""); // Stocke le commentaire

  // Fonction pour envoyer l'avis par email
  const sendReview = (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Veuillez donner une note et un commentaire.");
      return;
    }

    const templateParams = {
      user_rating: rating,
      user_comment: comment,
    };

    emailjs.send(
      "service_kbx302n",       // Remplace par ton service ID
      "template_oxqh8ti",      // Remplace par ton template ID
      templateParams,
      "BHk1iLE82BufxQBEO"           // Remplace par ton User ID EmailJS
    )
    .then(response => {
      alert("Avis envoyé avec succès !");
      setRating(null);
      setComment("");
    })
    .catch(error => {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue.");
    });
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Logo" className="footer-logo" />
      </div>

      <div className="footer-middle">
        <ul className="footer-links">
          <li><Link to="about" smooth={true} offset={-200} duration={500}>À propos</Link></li>
          <li><Link to="contact" smooth={true} offset={-150} duration={500}>Contact & Aide</Link></li>
          <li><Link to="slider-container" smooth={true} offset={-150} duration={500}>Avis</Link></li>
        </ul>
      </div>

      <div className="footer-right">
        <h3>Donnez votre avis</h3>
        <div className="rating">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i} className="star">
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ display: "none" }}
                />
                <FaStar
                  size={25}
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5d9"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          className="review-input"
          placeholder="Laissez un commentaire..."
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="submit-review" onClick={sendReview}>Envoyer</button>
        <div className="footer-bottom">
          <h1>© 2025 UniHub. Tous droits réservés.</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
