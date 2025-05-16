import React, { useState } from "react";
import PlacarTime from "../components/PlacarTime";
import "../styles/placar-partida-style/placar-partida-style.css";
import logoPlacar from "../assets/placar.svg";
import { useLocation } from "react-router-dom";
import ModalFeedback from "../components/ModalFeedback";

export default function PlacarPartida() {
  const { state } = useLocation();
  const [leftTeamCount, setLeftTeamCount] = useState(0);
  const [rightTeamCount, setRightTeamCount] = useState(0);
  const [sets, setSets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [mensagem, setMensagem] = useState("");

  const finalizarSet = () => {
    const novoSet = {
      numero: sets.length + 1,
      leftScore: leftTeamCount,
      rightScore: rightTeamCount,
      vencedor: leftTeamCount > rightTeamCount ? "left" : "right",
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

  const infoLeft = state?.left;
  const infoRight = state?.right;
  const ambosTimesPresentes = infoLeft?.nome && infoRight?.nome;

  function calcularVencedorTimeA(sets) {
    const totalA = sets.reduce((acc, set) => acc + set.leftScore, 0);
    const totalB = sets.reduce((acc, set) => acc + set.rightScore, 0);
    return totalA > totalB;
  }

  function calcularVencedorTimeB(sets) {
    const totalA = sets.reduce((acc, set) => acc + set.leftScore, 0);
    const totalB = sets.reduce((acc, set) => acc + set.rightScore, 0);
    return totalB > totalA;
  }

  const finalizarPartida = async () => {
    if (!ambosTimesPresentes) {
      alert("Times não informados!");
      return;
    }

    const partidaParaEnviar = {
      set: {
        primeiroSetTimeA: sets[0]?.leftScore || 0,
        primeiroSetTimeB: sets[0]?.rightScore || 0,
        segundoSetTimeA: sets[1]?.leftScore || 0,
        segundoSetTimeB: sets[1]?.rightScore || 0,
        terceiroSetTimeA: sets[2]?.leftScore || 0,
        terceiroSetTimeB: sets[2]?.rightScore || 0,

        vencedorPartidaTimeA: calcularVencedorTimeA(sets),
        vencedorPartidaTimeB: calcularVencedorTimeB(sets),
      },
    };

    try {
      setIsOpen(true);

      const response = await fetch(
        `http://localhost:8080/partida/criarPartida?timeA=${encodeURIComponent(
          infoLeft.nome
        )}&timeB=${encodeURIComponent(infoRight.nome)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partidaParaEnviar),
          credentials: "include",
        }
      );

      if (!response.ok) {
        setStatus("erro");
        setMensagem("Erro ao finalizar partida.");
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao finalizar partida.");
      }

      setMensagem("Partida finalizada com sucesso!");
      setStatus("sucesso");
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      setStatus("erro");
      setMensagem(error.message || "Erro desconhecido.");
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
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
      {ambosTimesPresentes && (
        <button className="botao-finalizar" onClick={finalizarPartida}>
          Finalizar Partida
        </button>
      )}

      <ModalFeedback isOpen={isOpen} estado={status} mensagem={mensagem} />
    </main>
  );
}
