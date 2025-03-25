import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Token manquant.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/verify-email?token=${token}`);
        setMessage(response.data.message);
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          navigate(response.data.redirectUrl);
        }, 2000);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Une erreur est survenue.';
        setError(errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-12">
          <h2>Vérification de l'email</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;