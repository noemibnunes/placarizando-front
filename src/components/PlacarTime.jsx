import React from 'react';

export default function PlacarTime({ team, teamCount, handleClick, decreaseCount, sets }) {
  const teamColor = team === 'left' ? '#f17d60' : '#00aad3';
  const winnerColor = team === 'left' ? '#f17d60' : '#00aad3';
  
  return (
    <div className={`placar${team === 'left' ? '1' : '2'}`}>
      <div>
        <ul className="pontuacao">
          {sets.map((set) => (
            <li
              key={set.numero}
              style={{
                backgroundColor: set.vencedor === team ? winnerColor : null,
              }}
            >
              <span>{set.numero + 'ºset'}</span>
              <h3>{team === 'left' ? set.leftScore : set.rightScore}</h3>
            </li>
          ))}
        </ul>
        <div
          className="contar-pontos"
          style={{ backgroundColor: teamColor }}
          onClick={handleClick}
        >
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
