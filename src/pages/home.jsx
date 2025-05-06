import '../styles/home-style/home-style.css';
import logo from '../assets/placarizando-logo.svg';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Home() {
  const navigate = useNavigate();

  const navigateIniciarPartida = () => {
    navigate('/placar-partida');
  };

  const navigateModoTorneio = async () => {
    navigate('/modo-torneio');
  };

  return (
    <main className="home">
      <div className="home-content">
        <img src={logo} alt="Logo do jogo" />
        <button onClick={navigateIniciarPartida}>Modo Partida</button>
        <button onClick={navigateModoTorneio}>Modo Torneio</button>
      </div>
    </main>
  );
}
