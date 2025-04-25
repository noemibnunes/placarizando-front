// src/components/HeaderContent.js
import React from 'react';
import voltar from '../assets/icon-back.svg';

export default function Header({ title }) {
  const voltarPaginaAnterior = () => {
    window.history.back(); 
  };

  return (
    <div className="header-content">
      <img
        className="icon-back"
        src={voltar}
        alt="Icon de voltar"
        onClick={voltarPaginaAnterior} 
      />
      <h2 className="title">{title}</h2>
    </div>
  );
}
