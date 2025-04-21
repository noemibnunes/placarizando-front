import React, { useState } from "react";
import "../styles/placar-partida-style/placar-partida-style.css";
import logoPlacar from "../assets/placar.svg";

export default function PlacarPartida() {
  // Definindo o estado para cada contador
  const [blueCount, setBlueCount] = useState(0);
  const [redCount, setRedCount] = useState(0);

  // set
  const [blueSetCount, setBlueSetCount] = useState(0);
  const [redSetCount, setRedSetCount] = useState(0);

  // set - pontuacao
  const [blueSetScores, setBlueSetScores] = useState([]);
  const [redSetScores, setRedSetScores] = useState([]);

  // Função para aumentar o contador da div azul
  const handleBlueClick = () => {
    setBlueCount(blueCount + 1);
  };

  // Função para aumentar o contador da div vermelha
  const handleRedClick = () => {
    setRedCount(redCount + 1);
  };

  // Função para reiniciar os contadores
  // const resetCounters = () => {
  //   setBlueCount(0);
  //   setRedCount(0);
  // };

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

  // Finalizar o set
  const finalizarSet = () => {
    if (blueCount > redCount) {
      setBlueSetCount(blueSetCount + 1);
      setBlueSetScores([...blueSetScores, blueCount]);
    } else if (redCount > blueCount) {
      setRedSetCount(redSetCount + 1);
      setRedSetScores([...redSetScores, redCount]);
    }
    setBlueCount(0);
    setRedCount(0);
  };

  return (
    <main className="partida">
      <div className="titulo-container">
        <div className="logo-placar">
          <img src={logoPlacar} alt="Logo do placar" />
          <span>Modo Partida</span>
        </div>
      </div>

      <div className="set-info">
        <h1>SET</h1>
        <div className="set-contadores-completo">
          <div className="set-lateral">
            <span className="set-count azul">{blueSetCount}</span>
            <ul className="score-list">
              {blueSetScores.map((score, index) => (
                <li key={index}>{score}</li>
              ))}
            </ul>
          </div>

          <div className="set-lateral">
            <span className="set-count vermelho">{redSetCount}</span>
            <ul className="score-list">
              {redSetScores.map((score, index) => (
                <li key={index}>{score}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="placares">
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
      </div>
      <button onClick={finalizarSet}>Finalizar Set</button>
    </main>
  );
}
