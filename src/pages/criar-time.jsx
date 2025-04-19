import React, { useState } from "react";
import "../styles/time-jogador-style/time-style.css";
import text from "../assets/criar-time.svg";
import axios from "axios";

export default function CriarTime() {
  const [times, setTimes] = useState([
    { nomeTime: "", corReferencia: "#FFFFFF" },
    { nomeTime: "", corReferencia: "#FFFFFF" },
  ]);

  const [mensagem, setMensagem] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimes((prev) => {
      const updated = [...prev];
      updated[currentSlide] = { ...updated[currentSlide], [name]: value };
      return updated;
    });
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setTimes((prev) => {
      const updated = [...prev];
      updated[currentSlide].corReferencia = value;
      return updated;
    });
  };

  const submeterTime = async (e) => {
    e.preventDefault(); 

    try {
      await Promise.all(
        times.map((time) =>
          axios.post("http://localhost:8080/time/criarTime", time)
        )
      );
      setTimeout(() => {
        setMensagem("Times criados com sucesso!");
      }, 2000);
    } catch (err) {
      setTimeout(() => {
        setMensagem(err.response.data.message);
      }, 3000);
    }
  };

  return (
    <main className="criar-time">
      <div className="content">
        <div>
          <img src={text} alt="Criar Time" />
        </div>
        <div className="carousel">
          <form onSubmit={submeterTime}>
            <h2>Criar {`Time ${currentSlide + 1}`}</h2>
            <label htmlFor="">Nome do Time:</label>
            <input
              type="text"
              value={times[currentSlide].nomeTime}
              onChange={handleChange}
              name="nomeTime"
            />
            <span />

            <label
              htmlFor="hs-color-input"
              className="block text-sm font-medium mb-2"
            >
              Escolha a Cor:
            </label>
            <input
              type="color"
              id="hs-color-input"
              value={times[currentSlide].corReferencia}
              onChange={handleColorChange}
              title="Escolha a cor do seu time"
              className="p-1 h-10 w-14 block bg-white border cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            />

            <div className="buttons">
              {currentSlide > 0 && (
                <button
                  type="button"
                  className="btn-voltar"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSlide(currentSlide - 1);
                  }}
                >
                  Voltar
                </button>
              )}
              {currentSlide === 1 ? (
                <button type="submit">Enviar</button> 
              ) : (
                <button
                  type="button"
                  className="btn-prox"
                  disabled={!times[currentSlide].nomeTime.trim()} 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSlide(currentSlide + 1);
                  }}
                >
                  Próximo
                </button>
              )}
            </div>
          </form>
          {mensagem && <span className="cliquei">{mensagem}</span>}
        </div>
      </div>
    </main>
  );
}