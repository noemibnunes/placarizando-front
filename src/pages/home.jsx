import '../styles/home-style/home-style.css';
import logo from '../assets/placarizando-logo.svg';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Home() {
  const navigate = useNavigate();

  const navigateIniciarPartida = () => {
    navigate('/placar-partida');
  };

  const navigateCriarTorneio = async () => {
    navigate('/criar-torneio');
  };

  return (
    <main className="home">
      <div className="home-content">
        <img src={logo} alt="Logo do jogo" />
        <button onClick={navigateIniciarPartida}>Modo Partida</button>
        <button onClick={navigateCriarTorneio}>Modo Torneio</button>
      </div>
    </main>
  );
}
