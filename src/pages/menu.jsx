import '../styles/home-style/home-style.css';
import logoPlacar from '../assets/placar.svg';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Menu() {
  const navigate = useNavigate();

  const navigateAdicionarJogador = () => {
    navigate('/add-jogador');
  };

  return (
    <main className="home">
      <div className="home-content">
        <img src={logoPlacar} alt="Logo do menu" />
        <button onClick={navigateAdicionarJogador}>Jogadores</button>
        <button>Time</button>
        <button>Partidas</button>
      </div>
    </main>
  );
}
