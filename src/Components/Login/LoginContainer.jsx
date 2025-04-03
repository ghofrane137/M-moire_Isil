import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import login_img from "../../assets/login-removebg-preview.png";
import img1 from "../../assets/profil1.png";
import img2 from "../../assets/profil2.png";
import img3 from "../../assets/profil3.png";
import img4 from "../../assets/profil4.png";
import img5 from "../../assets/profil5.png";

const avatarOptions = [
  { id: 'profil1', src: img1 },
  { id: 'profil2', src: img2 },
  { id: 'profil3', src: img3 },
  { id: 'profil4', src: img4 },
  { id: 'profil5', src: img5 },
];

const LoginContainer = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    rememberMe: false,
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    repeatPassword: '', // Updated to match backend
    step: 1,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (isSignUp) {
      if (!formData.nom.trim()) return setError("Le nom est requis.");
      if (!formData.prenom.trim()) return setError("Le prénom est requis.");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) return setError("Veuillez entrer une adresse email valide.");
      if (!formData.email.endsWith("usthb.dz")) return setError("L'email doit être un email officiel de l'université (domaine usthb.dz).");
      if (formData.password.length < 6) return setError("Le mot de passe doit contenir au moins 6 caractères.");
    }

    const url = isSignUp ? 'http://localhost:8080/api/v1/auth/register' : 'http://localhost:8080/api/v1/auth/login';
    const data = isSignUp
      ? { nom: formData.nom, prenom: formData.prenom, email: formData.email, password: formData.password, avatar: selectedAvatar || 'default' }
      : { email: formData.email, password: formData.password, rememberMe: formData.rememberMe };

    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
        params: isSignUp ? {} : { rememberMe: formData.rememberMe },
      });
      const { token, message, redirectUrl } = response.data;
      localStorage.setItem('token', token);

      setSuccessMessage(message);
      setTimeout(() => {
        if (isSignUp) onClose();
        else navigate(redirectUrl || '/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
      console.error('Erreur:', err.response || err.message);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post(`http://localhost:8080/forgotpassword/verifyEmail/${forgotPasswordData.email}`);
      setSuccessMessage(response.data);
      setForgotPasswordData({ ...forgotPasswordData, step: 2 });
    } catch (err) {
      setError(err.response?.data || 'Erreur lors de l\'envoi de l\'email.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post(`http://localhost:8080/forgotpassword/verifyOTP/${forgotPasswordData.otp}/${forgotPasswordData.email}`);
      setSuccessMessage(response.data);
      if (response.status === 200) setForgotPasswordData({ ...forgotPasswordData, step: 3 });
    } catch (err) {
      setError(err.response?.data || 'OTP invalide.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    if (forgotPasswordData.newPassword !== forgotPasswordData.repeatPassword) {
      return setError('Les mots de passe ne correspondent pas.');
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/forgotpassword/changePassword/${forgotPasswordData.email}`,
        {
          password: forgotPasswordData.newPassword,
          repeatPassword: forgotPasswordData.repeatPassword, // Updated to match backend
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setSuccessMessage(response.data);
      setTimeout(() => setShowForgotPassword(false), 2000);
    } catch (err) {
      setError(err.response?.data || 'Erreur lors du changement de mot de passe.');
      console.error('Erreur:', err.response || err.message);
    }
  };

  return (
    <>
      <div className="container-login" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="row border rounded-5 p-3 bg-white shadow" style={{ position: 'relative', maxWidth: '900px' }}>
          <button 
            className="btn-close" 
            onClick={onClose} 
            style={{ position: 'absolute', top: '10px', right: '10px' }}
            aria-label="Fermer"
          ></button>

          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column" style={{ background: '#F8F4F1' }}>
            <img src={login_img} style={{ width: '330px' }} alt="Featured" />
          </div>

          <div className="col-md-6">
            <div className="header-text mb-1">
              <h2>{isSignUp ? "Créer un compte" : "Bonjour, de nouveau"}</h2>
              <p>{isSignUp ? "Rejoignez-nous aujourd'hui !" : "Heureux de vous revoir."}</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div className="input-group mb-3">
                    <input type="text" name="nom" className="form-control" placeholder="Nom" value={formData.nom} onChange={handleInputChange} required />
                  </div>
                  <div className="input-group mb-3">
                    <input type="text" name="prenom" className="form-control" placeholder="Prénom" value={formData.prenom} onChange={handleInputChange} required />
                  </div>
                </>
              )}
              <div className="input-group mb-3">
                <input type="email" name="email" className="form-control" placeholder="Adresse email (ex. nom@usthb.dz)" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="input-group mb-1">
                <input type="password" name="password" className="form-control" placeholder="Mot de passe" value={formData.password} onChange={handleInputChange} required minLength="6" />
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
                        className={selectedAvatar === avatar.id ? 'selected' : ''} 
                        style={{ width: '50px', height: '50px', cursor: 'pointer', border: selectedAvatar === avatar.id ? '3px solid #6f5de7' : 'none', borderRadius: '50%' }} 
                        onClick={() => setSelectedAvatar(avatar.id)} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="formCheck" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
                    <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Se souvenir de moi</small></label>
                  </div>
                  <div className="forgot">
                    <small><a href="#" onClick={(e) => { e.preventDefault(); setShowForgotPassword(true); }}>Mot de passe oublié ?</a></small>
                  </div>
                </div>
              )}

              <div className="input-group mb-2">
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6f5de7', borderColor: '#6f5de7', color: 'white' }}>
                  {isSignUp ? "S'inscrire" : "Se connecter"}
                </button>
              </div>
            </form>

            <div className="text-center">
              <small>
                {isSignUp ? "Déjà un compte ? " : "Pas de compte ? "}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); setSelectedAvatar(null); setFormData({ nom: '', prenom: '', email: '', password: '', rememberMe: false }); setError(''); setSuccessMessage(''); }}>
                  {isSignUp ? "Se connecter" : "S'inscrire"}
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' ,zIndex: 1050 /* Ajout de z-index pour s'assurer qu'il est au-dessus */}}>
          <div className="border rounded-5 p-4 bg-white shadow" style={{ width: '400px', position: 'relative' }}>
            <button className="btn-close" onClick={() => setShowForgotPassword(false)} style={{ position: 'absolute', top: '10px', right: '10px' }} aria-label="Fermer"></button>
            <h2>Réinitialiser le mot de passe</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {forgotPasswordData.step === 1 && (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-3">
                  <input type="email" name="email" className="form-control" placeholder="Entrez votre email" value={forgotPasswordData.email} onChange={handleForgotPasswordChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6f5de7', borderColor: '#6f5de7', color: 'white' }}>Envoyer OTP</button>
              </form>
            )}

            {forgotPasswordData.step === 2 && (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-3">
                  <input type="number" name="otp" className="form-control" placeholder="Entrez l'OTP reçu" value={forgotPasswordData.otp} onChange={handleForgotPasswordChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6f5de7', borderColor: '#6f5de7', color: 'white' }}>Vérifier OTP</button>
              </form>
            )}

            {forgotPasswordData.step === 3 && (
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <input type="password" name="newPassword" className="form-control" placeholder="Nouveau mot de passe" value={forgotPasswordData.newPassword} onChange={handleForgotPasswordChange} required />
                </div>
                <div className="mb-3">
                  <input type="password" name="repeatPassword" className="form-control" placeholder="Confirmer le mot de passe" value={forgotPasswordData.repeatPassword} onChange={handleForgotPasswordChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#6f5de7', borderColor: '#6f5de7', color: 'white' }}>Changer le mot de passe</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginContainer;