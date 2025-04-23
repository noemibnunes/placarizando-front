import '../styles/torneio-style/torneio.css';
import { useNavigate } from 'react-router-dom';
import placar from '../assets/placar.svg';

import React from 'react';

export default function Menu() {
  const navigate = useNavigate();

  const navigateAdicionarJogador = () => {
    navigate('/add-jogador');
  };

  return (
    <main className="torneio">
      <div className="cabecalho">
        <img src={placar} alt="placar" />
        <span>modo torneio</span>
      </div>
      <button onClick={navigateAdicionarJogador}>Jogadores</button>
      <button>Time</button>
      <button>Partidas</button>
    </main>
  );
}
