import React, { useState } from 'react';
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
        <div className="placar1">
          <div>
            <ul className="pontuacao">
              {sets.map((set) => (
                <li
                  key={set.numero}
                  style={{
                    backgroundColor:
                      set.vencedor === 'left' ? '#f17d60' : null,
                  }}
                >
                  <span>{set.numero + 'ºset'}</span>
                  <h3>{set.leftScore}</h3>
                </li>
              ))}
            </ul>
            <div
              className="contar-pontos"
              style={{ backgroundColor: '#f17d60' }}
              onClick={handleLeftTeamClick}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseLeftTeamCount();
                }}
                className="botao-flutuante"
              >
                &#x2212;
              </button>
              <span>{leftTeamCount}</span>
            </div>
          </div>
        </div>

        <div className="divisao"></div>

        <div className="placar2">
          <div>
            <ul className="pontuacao">
              {sets.map((set) => (
                <li
                  key={set.numero}
                  style={{
                    backgroundColor:
                      set.vencedor === 'right' ? '#00aad3' : null,
                  }}
                >
                  <span>{set.numero + 'ºset'}</span>
                  <h3>{set.rightScore}</h3>
                </li>
              ))}
            </ul>
            <div
              className="contar-pontos"
              style={{ backgroundColor: '#00aad3' }}
              onClick={handleRightTeamClick}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseRightTeamCount();
                }}
                className="botao-flutuante"
              >
                &#x2212;
              </button>
              <span>{rightTeamCount}</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={finalizarSet}>Finalizar Set</button>
    </main>
  );
}
