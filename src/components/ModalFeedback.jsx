import React, { useEffect, useState } from 'react';
import '../styles/others-style/modal-style.css';

export default function ModalFeedback({ isOpen, estado, mensagem }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-feedback">
        <div className="modal-icon">
          {loading ? (
            <div className="loader"></div>
          ) : estado === 'sucesso' ? (
            <div className="checkmark">✔</div>
          ) : (
            <div className="error">✖</div>
          )}
        </div>

        {loading ? 'Aguarde...' : <p className="modal-message">{mensagem}</p>}
      </div>
    </div>
  );
}
