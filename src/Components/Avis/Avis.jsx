import React, { useState } from "react";
import "./Avis.css";

const Avis = () => {
  const [avis, setAvis] = useState([]);
  const [newAvis, setNewAvis] = useState({ note: 0, commentaire: "" });

  const handleNoteChange = (note) => {
    setNewAvis({ ...newAvis, note });
  };

  const handleCommentChange = (e) => {
    setNewAvis({ ...newAvis, commentaire: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAvis.note > 0 && newAvis.commentaire.trim() !== "") {
      setAvis([...avis, newAvis]);
      setNewAvis({ note: 0, commentaire: "" }); // Réinitialiser le formulaire
    }
  };

  return (
    <div className="avis-container">
      <h2>Donnez votre avis</h2>
      <form onSubmit={handleSubmit}>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= newAvis.note ? "star selected" : "star"}
              onClick={() => handleNoteChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Laissez un commentaire..."
          value={newAvis.commentaire}
          onChange={handleCommentChange}
        ></textarea>
        <button type="submit">Envoyer</button>
      </form>

      <h3>Avis des utilisateurs</h3>
      <ul className="avis-list">
        {avis.map((a, index) => (
          <li key={index}>
            <div className="stars">
              {[...Array(a.note)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p>{a.commentaire}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Avis;
