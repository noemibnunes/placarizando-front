import React from "react";
import "../styles/time-jogador-style/time-style.css";

export default function CriarJogador() {
  
  return (
    <main className="criar-time">
      <div className="content">
        <h2 className="title">Sortear Equipe</h2>
          <form>
            <label htmlFor="">Nomes:</label>
            <input
              type="text"
              name="nomeTime"
            />
            <span />
            <button type="submit">Sortear Equipe</button> 
          </form>
          {/* {mensagem && <span className="cliquei">{mensagem}</span>} */}
      </div>
    </main>
  );
}