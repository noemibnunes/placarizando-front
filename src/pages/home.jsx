import React, { useState } from 'react';
import '../styles/home-style/home-style.css';
import logo from '../assets/placarizando-logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/placar-partida');
  };

  return (
    <div className="home">
      <div className="home-content">
        <img src={logo} alt="Logo do jogo" />
        <button onClick={handleClick}>iniciar</button>
      </div>
    </div>
  );
}
