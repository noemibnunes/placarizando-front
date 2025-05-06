import React from 'react';
import '../styles/time-jogador-style/time-style.css';

export default function ListarTimesComJogadores({ timesComJogadores }) {
  return (
    <>
      <div className="dados-time">
        {timesComJogadores.map((time, indexTime) => (
          <div key={indexTime}>
            <label>{time.time}</label>
            {time.jogadores.map((jogador, indexJogador) => (
              <input
                key={indexJogador}
                disabled={true}
                value={jogador.nomeJogador}
                name={`jogador${indexJogador}`}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
