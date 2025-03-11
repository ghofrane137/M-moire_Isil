import React from 'react';
import './LoginContainer.css'; // Import your CSS file
import login_img from "../../assets/login-removebg-preview.png";

const LoginContainer = ({ onClose }) => {
  return (
    <div className="container-login d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area position-relative">
        {/* Close Button */}
        <button 
          className="btn-close position-absolute top-0 end-0 m-3" 
          onClick={onClose}
          aria-label="Fermer">
        
        </button>

        {/* Left Box */}
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#F8F4F1' }}>
          <div className="featured-image mb-3">
            <img src={login_img} className="img-fluid" style={{ width: '330px' }} alt="Featured" />
          </div>
         
        </div>

        {/* Right Box */}
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Hello, Again</h2>
              <p>We are happy to have you back.</p>
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
            </div>
            <div className="input-group mb-1">
              <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" />
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="formCheck" />
                <label htmlFor="formCheck" className="form-check-label text-secondary">
                  <small>Remember Me</small>
                </label>
              </div>
              <div className="forgot">
                <small>
                  <a href="#">Forgot Password?</a>
                </small>
              </div>
            </div>
            <div className="input-group mb-3">
              <button className="text-purpul btn btn-lg btn-primary w-100 fs-6" style={{ backgroundColor: "#6f5de7", borderColor: "#6f5de7", color: "white" }}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;