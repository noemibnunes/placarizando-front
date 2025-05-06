import React, { useEffect, useState } from "react";
import "../styles/time-jogador-style/jogador-style.css";
import "../styles/time-jogador-style/time-style.css";
import "../styles/default-style.css";
import deletar from "../assets/icon-delete.svg";
import add from "../assets/icon-add.svg";
import editar from "../assets/icon-edit.svg";
import Header from "../components/Header";

export default function CriarJogador() {
  const [jogadores, setJogadores] = useState([{}]);
  const [mensagem, setMensagem] = useState("");

  const adicionarInput = () => {
    setJogadores([...jogadores, {}]);
  };

  const handleChangeNome = (index, value) => {
    const novosJogadores = [...jogadores];
    novosJogadores[index].nomeJogador = value;
    setJogadores(novosJogadores);
  };

  const handleChangeNota = (index, value) => {
    const novosJogadores = [...jogadores];
    novosJogadores[index].nota = value;
    setJogadores(novosJogadores);
  };

  useEffect(() => {
    async function buscarJogadores() {
      try {
        const response = await fetch(
          `http://localhost:8080/jogador/buscarJogadores`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Erro ao buscar jogadores.");

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setJogadores(data.map((j) => j.nomeJogador));
        }
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error.message);
      }
    }

    buscarJogadores();
  }, []);

  const salvarJogadores = async (e) => {
    e.preventDefault();

    const jogadoresValidos = jogadores
      .map((nomeJogador) => nomeJogador.trim())
      .filter((nomeJogador) => nomeJogador !== "");

    try {
      const response = await fetch(
        `http://localhost:8080/jogador/criarJogador`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

  const deletarJogador = async (index, jogador) => {
    if (!jogador.nomeJogador || jogador.nomeJogador.trim() === "") {
      setJogadores(jogadores.filter((_, i) => i !== index));
    }
  };

  return (
    <main className="criar-jogador ">
      <div className="content">
        <Header title="JOGADORES" />
        <div className="filtro-time">
          <label>Filtrar por time</label>
          <select name="select">
            <option value="selecione" select>
              Selecione
            </option>
            <option value="">Valor 3</option>
          </select>
        </div>

        <form onSubmit={salvarJogadores}>
          <div className="labels">
            <label style={{ flex: 1 }} htmlFor="">
              Nome
            </label>
            <label style={{ flex: 1 }} htmlFor="">
              Nota
            </label>
          </div>

          {jogadores.map((jogador, index) => (
            <div className="jogador">
              <input
                style={{ flex: 2 }}
                key={index}
                type="text"
                value={jogador.nomeJogador}
                onChange={(e) => handleChangeNome(index, e.target.value)}
                name={`nome${index}`}
              />

              <input
                style={{ flex: 1 }}
                key={index}
                type="text"
                value={jogador.nota}
                onChange={(e) => handleChangeNota(index, e.target.value)}
                name={`nota${index}`}
              />

              <img
                className="icon-delete"
                src={deletar}
                alt="Icon de deletar"
                onClick={() => deletarJogador(index, jogador)}
              />

              <img className="icon-edit" src={editar} alt="Icon de editar" />
            </div>
          ))}

          <div className="btn-add-wrapper">
            <button type="button" className="btn-add" onClick={adicionarInput}>
              <img className="icon-add" src={add} alt="Icon de adicionar" />
            </button>
          </div>
        </form>
      </div>

      <div className="footer">
        <div className="btn-salvar">
          <button type="submit">Salvar</button>
        </div>
        {mensagem && <span className="cliquei">{mensagem}</span>}
      </div>
    </main>
  );
}
