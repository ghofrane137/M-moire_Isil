import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Suppression du bouton de fermeture */}
        {children}
      </div>
    </div>
  );
};

export default Modal;