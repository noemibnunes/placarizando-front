import React from 'react';
import '../styles/time-jogador-style/time-style.css';

export default function ListarTimesComJogadores({ nomeTime, jogadores }) {
  return (
    <>
      <div className="dados-time">
        <label htmlFor="">{nomeTime}</label>
        {jogadores.map((jogador, index) => (
          <input
            key={index}
            disabled={true}
            value={jogador.nomeJogador}
            name={`jogador${index}`}
          />
        ))}
      </div>
    </>
  );
}
