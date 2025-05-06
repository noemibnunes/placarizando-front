import React, { useState } from 'react';
import PlacarTime from '../components/PlacarTime'; // Importa o componente PlacarTime
import '../styles/placar-partida-style/placar-partida-style.css';
import logoPlacar from '../assets/placar.svg';

export default function PlacarPartida() {
  const [leftTeamCount, setLeftTeamCount] = useState(0);
  const [rightTeamCount, setRightTeamCount] = useState(0);
  const [sets, setSets] = useState([]);

  const finalizarSet = () => {
    const novoSet = {
      numero: sets.length + 1,
      leftScore: leftTeamCount,
      rightScore: rightTeamCount,
      vencedor: leftTeamCount > rightTeamCount ? 'left' : 'right',
    };

    setSets([...sets, novoSet]);
    setLeftTeamCount(0);
    setRightTeamCount(0);
  };

  const handleLeftTeamClick = () => setLeftTeamCount(leftTeamCount + 1);
  const handleRightTeamClick = () => setRightTeamCount(rightTeamCount + 1);

  const decreaseLeftTeamCount = () => {
    if (leftTeamCount > 0) setLeftTeamCount(leftTeamCount - 1);
  };

  const decreaseRightTeamCount = () => {
    if (rightTeamCount > 0) setRightTeamCount(rightTeamCount - 1);
  };

  return (
    <main className="partida-content">
      <div className="partida-logo">
        <a href="/" className="logo-left">
          <img src={logoPlacar} alt="logo" />
          <span>modo partida</span>
        </a>
        <h4>SET</h4>
        <div className="placeholder" />
      </div>

      <div className="placar">
        <PlacarTime
          team="left"
          teamCount={leftTeamCount}
          handleClick={handleLeftTeamClick}
          decreaseCount={decreaseLeftTeamCount}
          sets={sets}
        />
        
        <div className="divisao"></div>

        <PlacarTime
          team="right"
          teamCount={rightTeamCount}
          handleClick={handleRightTeamClick}
          decreaseCount={decreaseRightTeamCount}
          sets={sets}
        />
      </div>

      <button onClick={finalizarSet}>Finalizar Set</button>
    </main>
  );
}
