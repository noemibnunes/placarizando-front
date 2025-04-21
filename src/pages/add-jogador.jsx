import React, { useEffect, useState } from "react";
import "../styles/time-jogador-style/time-style.css";
import { useTorneio } from '../context/torneioContext';

export default function CriarJogador() {
  const [nomes, setNomes] = useState([""]);
  const [mensagem, setMensagem] = useState("");
  const [temJogadores, setTemJogadores] = useState(false); // ← novo estado

  const adicionarInput = () => {
    setNomes([...nomes, ""]);
  };

  const handleChange = (index, value) => {
    const novosNomes = [...nomes];
    novosNomes[index] = value;
    setNomes(novosNomes);
  };

  const { codigoUnico } = useTorneio();

  useEffect(() => {
    async function buscarJogadores() {
      try {
        const response = await fetch(`http://localhost:8080/jogador/all/${codigoUnico}`);
        if (!response.ok) throw new Error("Erro ao buscar jogadores.");
  
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setTemJogadores(true);
          setNomes(data.map((j) => j.nomeJogador));
        } else {
          setTemJogadores(false);
        }
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error.message);
      }
    }
  
    buscarJogadores();
  }, []);

  const salvarJogadores = async (e) => {
    e.preventDefault();

    const jogadoresValidos = nomes
      .map((nomeJogador) => nomeJogador.trim())
      .filter((nomeJogador) => nomeJogador !== "");

    try {
      const response = await fetch(
        `http://localhost:8080/jogador/criarJogador?codigoCampeonato=${codigoUnico}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            jogadoresValidos.map((nomeJogador) => ({ nomeJogador }))
          ),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao salvar jogadores.");
      }

      setTimeout(() => {
        setMensagem("Jogadores salvos com sucesso!");
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setMensagem(error.message || "Erro desconhecido.");
      }, 2000);
    }
  };

  return (
    <main className="add-jogador">
      <div className="content">
        <h2 className="title">JOGADORES</h2>
        <form onSubmit={salvarJogadores}>
          <label htmlFor="">Nome</label>
          {nomes.map((nome, index) => (
            <input
              key={index}
              type="text"
              value={nome}
              onChange={(e) => handleChange(index, e.target.value)}
              name={`nome${index}`}
            />
          ))}

          <div className="btn-add-wrapper">
            <button type="button" className="btn-add" onClick={adicionarInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="icon-plus"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <button type="submit">{temJogadores ? "Editar" : "Adicionar"}</button>
          </form>
        {mensagem && <span className="cliquei">{mensagem}</span>}
      </div>
    </main>
  );
}
