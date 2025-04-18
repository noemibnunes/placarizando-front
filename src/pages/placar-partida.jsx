import React, { useState } from 'react';
import '../styles/placar-partida-style/placar-partida-style.css';

export default function PlacarPartida() {
  // Definindo o estado para cada contador
  const [blueCount, setBlueCount] = useState(0);
  const [redCount, setRedCount] = useState(0);

  // Função para aumentar o contador da div azul
  const handleBlueClick = () => {
    setBlueCount(blueCount + 1);
  };

  // Função para aumentar o contador da div vermelha
  const handleRedClick = () => {
    setRedCount(redCount + 1);
  };

  // Função para reiniciar os contadores
  const resetCounters = () => {
    setBlueCount(0);
    setRedCount(0);
  };

  // Função para diminuir o contador da div azul
  const decreaseBlueCount = () => {
    if (blueCount > 0) {
      setBlueCount(blueCount - 1);
    }
  };

  // Função para diminuir o contador da div vermelha
  const decreaseRedCount = () => {
    if (redCount > 0) {
      setRedCount(redCount - 1);
    }
  };

  return (
    <main>
      <div className="time azul" onClick={handleBlueClick}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            decreaseBlueCount();
          }}
        >
          &#x2212;
        </button>
        <div className="pontuacao">
          <span>{blueCount}</span>
        </div>
      </div>

      <div className="divider" />

      {/* onClick={resetCounters}  */}

      <div className="time vermelho" onClick={handleRedClick}>
        <div className="pontuacao">
          <span>{redCount}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            decreaseRedCount();
          }}
        >
          &#x2212;
        </button>
      </div>
    </main>
  );
}
