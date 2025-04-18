import React, { useState } from 'react';
import '../styles/time-jogador-style/time-style.css';
import text from '../assets/criar-time.svg';
import axios from 'axios';

export default function CriarTime() {
  const [formData, setFormData] = useState({
    nomeTime: '',
    corReferencia: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorClick = (color) => {
    setFormData((prev) => ({
      ...prev,
      corReferencia: color,
    }));
  };

  const submeterTime = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://192.168.0.5:8080/time/criarTime', formData);
      setMensagem('cliquei em enviar');
    } catch {
      setMensagem('erro ao enviar dados');
    }
  };

  return (
    <main className="criar-time">
      <div className="content">
        <div>
          <img src={text} alt="" />
        </div>
        <form onSubmit={submeterTime}>
          <label htmlFor="">Nome do Time:</label>
          <input
            type="text"
            value={formData.nomeTime}
            onChange={handleChange}
            name="nomeTime"
          />
          <span />
          <label htmlFor="">Cor:</label>
          <ul className="cores">
            {['#0000FF', '#FF0000', '#C71585', '#00FF00'].map((color) => (
              <li
                key={color}
                onClick={() => handleColorClick(color)}
                className={formData.corReferencia === color ? 'selected' : ''}
                style={{ backgroundColor: color }}
              />
            ))}
          </ul>
          <button type="submit">Enviar</button>
        </form>

        {mensagem && <span className="cliquei">{mensagem}</span>}
      </div>
    </main>
  );
}
