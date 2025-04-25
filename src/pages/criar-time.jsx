import React, { useState, useEffect } from 'react';
import '../styles/time-jogador-style/time-style.css';
import axios from 'axios';
import ListarTimesComJogadores from '../components/ListarTimesComJogadores';

export default function CriarTime() {
  const [times, setTimes] = useState([
    {
      nomeTime: '',
      corReferencia: '#FFFFFF',
    },
  ]);

  const [jogadores, setJogadores] = useState(['']);

  const [ativo, setAtivo] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (times.length === 2) {
      setAtivo(true);
    } else {
      setAtivo(false);
    }
  }, [times]);

  const adicionarInput = () => {
    setTimes([...times, { nomeTime: '', corReferencia: '#FFFFFF' }]);
  };

  const handleNomeTime = (index, value) => {
    const novosTimes = [...times];
    novosTimes[index].nomeTime = value;
    setTimes(novosTimes);
  };

  const handleCor = (index, value) => {
    const novosTimes = [...times];
    novosTimes[index].corReferencia = value;
    setTimes(novosTimes);
  };

  useEffect(() => {
    const buscarTimes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/time', {
          withCredentials: true,
        });
        setTimes(response.data);
      } catch {
        console.log('erro');
      }
    };
    buscarTimes();
  }, []);

  const enviarTimes = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/time/criarTime',
        times,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        setMensagem('Times criados com sucesso!');
      }
    } catch {
      console.log('erro');
    }
  };

  useEffect(() => {
    const buscarJogadores = async () => {
      try {
        const response = await axios
          .get(
            'http://localhost:8080/jogador/buscarJogadoresRelacionadosAoTime',
            { param: { nomeTime: times[0].nomeTime }, withCredentials: true },
          )
          .then(setJogadores(response.data));
      } catch {
        console.log('erro');
      }
    };
    if (times >= 1) buscarJogadores();
  }, [jogadores]);

  return (
    <main className="criar-time">
      <header className="app-bar">
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <span>times</span>
      </header>
      <div className="times">
        {times.length >= 0 ? '' : <h4>Insira dois times para enviar:</h4>}
        {times.length >= 0 ? (
          <div className="dados-time">
            <form className="read-only">
              <label htmlFor="">Time</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  readOnly
                  value={time.nomeTime}
                  name={`nome${index}`}
                />
              ))}
            </form>
            <form>
              <label htmlFor="">Cor</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  type="color"
                  disabled
                  value={time.corReferencia}
                  name={`cor${index}`}
                />
              ))}
            </form>
          </div>
        ) : (
          <div className="dados-time">
            <form>
              <label htmlFor="">Time</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  type="text"
                  value={times.nomeTime}
                  onChange={(e) => handleNomeTime(index, e.target.value)}
                  name={`nome${index}`}
                />
              ))}
            </form>
            <form>
              <label htmlFor="">Cor</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  type="color"
                  value={time.corReferencia}
                  onChange={(e) => handleCor(index, e.target.value)}
                  name={`cor${index}`}
                />
              ))}
            </form>
          </div>
        )}
        <div className="btn-add-wrapper">
          <button
            type="button"
            className={`btn-add ${ativo ? 'ativo' : ''}`}
            onClick={ativo ? enviarTimes : adicionarInput}
          >
            {times.length === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
        <span>{mensagem}</span>
      </div>
      <div>
        <ListarTimesComJogadores
          nomeTime={times[0].nomeTime}
          jogadores={jogadores}
        />
      </div>
      <div className="botoes-escolha">
        <button>Escolher Times</button>
        <button>Sortear Times</button>
      </div>
    </main>
  );
}
