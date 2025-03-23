import React, { useState } from 'react';
import './LoginContainer.css';
import login_img from "../../assets/login-removebg-preview.png";
import img1 from "../../assets/profil1.png";
import img2 from "../../assets/profil2.png";
import img3 from "../../assets/profil3.png";
import img4 from "../../assets/profil4.png";
import img5 from "../../assets/profil5.png";
import axios from 'axios';

const avatarOptions = [
  { id: 'profil1', src: img1 },
  { id: 'profil2', src: img2 },
  { id: 'profil3', src: img3 },
  { id: 'profil4', src: img4 },
  { id: 'profil5', src: img5 },
];

const LoginContainer = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validation des champs
    if (isSignUp) {
      if (!formData.nom.trim()) {
        setError("Le nom est requis.");
        return;
      }
      if (!formData.prenom.trim()) {
        setError("Le prénom est requis.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Veuillez entrer une adresse email valide.");
        return;
      }
      const universityDomain = "usthb.dz";
      if (!formData.email.endsWith(universityDomain)) {
        setError(`L'email doit être un email officiel de l'université (domaine ${universityDomain}).`);
        return;
      }
      if (formData.password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }
    }

    const url = isSignUp
      ? 'http://localhost:8080/api/v1/auth/register'
      : 'http://localhost:8080/api/v1/auth/login';

    const data = isSignUp
      ? {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          password: formData.password,
          avatar: selectedAvatar || 'default', // Envoi de l'avatar (optionnel)
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    console.log('Données envoyées au backend :', data);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Réponse du backend :', response.data);
      const { token, message, profileCompleted, role } = response.data;

      localStorage.setItem('token', token);

      if (isSignUp) {
        setSuccessMessage(message); // "Un email de confirmation a été envoyé."
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSuccessMessage(message);
        setTimeout(() => {
          if (!profileCompleted) {
            window.location.href = '/complete-profile'; // Redirection si le profil n'est pas complet
          } else {
            window.location.href = '/dashboard'; // Redirection vers le tableau de bord
          }
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Une erreur est survenue.';
      if (errorMessage === "Cet email est déjà utilisé.") {
        setError("Cet email est déjà utilisé. Veuillez utiliser un autre email.");
      } else if (errorMessage === "Email ou mot de passe incorrect.") {
        setError("Email ou mot de passe incorrect. Veuillez réessayer.");
      } else if (errorMessage === "Veuillez vérifier votre email avant de vous connecter.") {
        setError("Veuillez vérifier votre email avant de vous connecter.");
      } else {
        setError(errorMessage);
      }
      console.error('Erreur détaillée:', err.response || err.message);
    }
  };

  return (
    <div className="container-login d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area position-relative">
        <button 
          className="btn-close position-absolute top-0 end-0 m-3" 
          onClick={onClose}
          aria-label="Fermer">
        </button>

        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#F8F4F1' }}>
          <div className="featured-image mb-3">
            <img src={login_img} className="img-fluid" style={{ width: '330px' }} alt="Featured" />
          </div>
        </div>

        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>{isSignUp ? "Créer un compte" : "Bonjour, de nouveau"}</h2>
              <p>{isSignUp ? "Rejoignez-nous aujourd'hui !" : "Heureux de vous revoir."}</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div className="input-group mb-3">
                    <input 
                      type="text" 
                      name="nom"
                      className="form-control form-control-lg bg-light fs-6" 
                      placeholder="Nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input 
                      type="text" 
                      name="prenom"
                      className="form-control form-control-lg bg-light fs-6" 
                      placeholder="Prénom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="input-group mb-3">
                <input 
                  type="email"
                  name="email"
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Adresse email (ex. nom@usthb.dz)"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group mb-1">
                <input 
                  type="password" 
                  name="password"
                  className="form-control form-control-lg bg-light fs-6" 
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength="6"
                />
              </div>

              {isSignUp && (
                <div className="avatar-selection mb-3">
                  <p className="text-secondary mb-2">Choisissez votre avatar :</p>
                  <div className="d-flex flex-wrap gap-2">
                    {avatarOptions.map((avatar, index) => (
                      <img 
                        key={index}
                        src={avatar.src}
                        alt={`Avatar ${index + 1}`}
                        className={`avatar-option rounded-circle ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          cursor: 'pointer', 
                          border: selectedAvatar === avatar.id ? '3px solid #6f5de7' : 'none' 
                        }}
                        onClick={() => setSelectedAvatar(avatar.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="formCheck" />
                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                      <small>Se souvenir de moi</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small><a href="#">Mot de passe oublié ?</a></small>
                  </div>
                </div>
              )}

              <div className="input-group mb-3">
                <button 
                  type="submit"
                  className="text-purpul btn btn-lg btn-primary w-100 fs-6" 
                  style={{ backgroundColor: "#6f5de7", borderColor: "#6f5de7", color: "white" }}
                >
                  {isSignUp ? "S'inscrire" : "Se connecter"}
                </button>
              </div>
            </form>

            <div className="text-center">
              <small>
                {isSignUp ? "Déjà un compte ? " : "Pas de compte ? "}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp(!isSignUp);
                    setSelectedAvatar(null);
                    setFormData({ nom: '', prenom: '', email: '', password: '' });
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-purple"
                >
                  {isSignUp ? "Se connecter" : "S'inscrire"}
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;