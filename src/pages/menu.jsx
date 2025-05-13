import '../styles/torneio-style/torneio.css';
import { useNavigate } from 'react-router-dom';
import placar from '../assets/placar.svg';

import React from 'react';

export default function Menu() {
  const navigate = useNavigate();

  return (
    <main className="torneio">
      <div className="cabecalho">
        <img src={placar} alt="placar" />
        <span>modo torneio</span>
      </div>
      <button onClick={() => navigate('/add-jogador')}>Jogadores</button>
      <button onClick={() => navigate('/criar-time')}>Time</button>
      <button onClick={() => navigate('/partidas')}>Partidas</button>
    </main>
  );
}
