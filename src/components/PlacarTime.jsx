import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PlacarTime({ team, teamCount, handleClick, decreaseCount, sets }) {
  const { state } = useLocation(); 

  const infoTime = state ? state[team] : {}; 
  const nomeTime = infoTime?.nome || (team === 'left' ? 'Casa' : 'Visitante');
  const corTime = infoTime?.cor || (team === 'left' ? '#00aad3' : '#f17d60'); 
  const corVencedor = corTime;

  return (
    <div className={`placar${team === 'left' ? '1' : '2'}`}>
      <div>
        <ul className="pontuacao">
          {sets.map((set) => (
            <li
              key={set.numero}
              style={{
                backgroundColor: set.vencedor === team ? corVencedor : null,
              }}
            >
              <span>{set.numero + 'ºset'}</span>
              <h3>{team === 'left' ? set.leftScore : set.rightScore}</h3>
            </li>
          ))}
        </ul>
        <div
          className="contar-pontos"
          style={{ backgroundColor: corTime }}
          onClick={handleClick}
        >
          <div className='nome-time'>
            <h2>{nomeTime}</h2>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              decreaseCount();
            }}
            className="botao-flutuante"
          >
            &#x2212;
          </button>
          <span>{teamCount}</span>
        </div>
      </div>
    </div>
  );
}
