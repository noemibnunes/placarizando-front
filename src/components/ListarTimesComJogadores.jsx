import React from 'react';
import '../styles/time-jogador-style/time-style.css';
import noData from '../assets/no-data.svg';

export default function ListarTimesComJogadores({ timesComJogadores }) {
  return (
    <>
      <div>
        {timesComJogadores.map((time, indexTime) => (
          <div key={indexTime} className="listar-jogadores">
            <label>{time.nomeTime}</label>
            {time.jogadores && time.jogadores.length > 0 ? (
              time.jogadores.map((jogador, indexJogador) => (
                <input
                  key={indexJogador}
                  disabled={true}
                  className="read-only"
                  value={jogador}
                  name={`jogador${indexJogador}`}
                />
              ))
            ) : (
              <img src={noData} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
