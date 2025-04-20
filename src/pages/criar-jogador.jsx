import React, { useState } from "react";
import "../styles/time-jogador-style/time-style.css";

export default function CriarJogador() {
  const [nomes, setNomes] = useState([""]);

  const adicionarInput = () => {
    setNomes([...nomes, ""]);
  };

  const handleChange = (index, value) => {
    const novosNomes = [...nomes];
    novosNomes[index] = value;
    setNomes(novosNomes);
  };

  return (
    <main className="criar-time">
      <div className="content">
        <h2 className="title">Sortear Equipe</h2>
        <form>
          <label htmlFor="">Nomes:</label>
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
            <button
              type="button"
              className="btn-add"
              onClick={adicionarInput}
            >
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

          <button type="submit">Sortear Equipes</button>
        </form>
        {/* {mensagem && <span className="cliquei">{mensagem}</span>} */}
      </div>
    </main>
  );
}
