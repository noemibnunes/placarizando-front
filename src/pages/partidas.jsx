import React, { useEffect, useState } from "react";
import "../styles/time-jogador-style/jogador-style.css";
import "../styles/default-style.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Partidas() {
  const navigate = useNavigate();
  const [times, setTimes] = useState([]);

  useEffect(() => {
      buscarTimes();
    }, []);

  // BUSCAR TIMES ==================================================
  const buscarTimes = async () => {
    try {
      const response = await fetch("http://localhost:8080/time", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao buscar times.");

      const data = await response.json();
      setTimes(data);
    } catch (error) {
      console.error("Erro ao buscar times:", error.message);
    }
  };

  const handlePartida = () => {
    if (times.length < 2) {
      console.error("Não há times suficientes para iniciar a partida.");
      return;
    }

    const infoTimes = {
      left: { nome: times[0].nomeTime, cor: times[0].corReferencia },
      right: { nome: times[1].nomeTime, cor: times[1].corReferencia },
    };

    console.log(infoTimes)
    navigate('/placar-partida', { state: infoTimes });

  };

  return (
    <main className="criar-jogador">
      <Header title={"partidas"} />

      <div className="footer">
        <div className="btn-iniciar-partida">
          <button onClick={handlePartida}>Iniciar Partida</button>
        </div>
      </div>
    </main>
  );
}

