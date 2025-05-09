import React, { useState, useEffect } from 'react';
import '../styles/time-jogador-style/time-style.css';
import axios from 'axios';
import ListarTimesComJogadores from '../components/ListarTimesComJogadores';
import Header from '../components/Header';

export default function CriarTime() {
  const [times, setTimes] = useState([
    {
      nomeTime: '',
      corReferencia: '#FFFFFF',
    },
  ]);

  const [timesComJogadores, setTimesComJogadores] = useState([
    {
      nomeTime: '',
      jogadores: [],
    },
  ]);

  const [ativo, setAtivo] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [editar, setEditar] = useState(false);

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
        if (response.status === 404) {
          setTimes([]);
        }
        setTimes(response.data);
      } catch {
        console.log('erro');
      }
    };
    buscarTimes();
  }, []);

  useEffect(() => {
    if (times.length == 2) {
      buscarJogadoresRelacionadosAoTime();
    }
  }, [times]);

  const buscarJogadoresRelacionadosAoTime = async () => {
    try {
      const promises = times.map((time) =>
        axios.get(
          'http://localhost:8080/jogador/buscarJogadoresRelacionadosAoTime',
          {
            params: { nomeTime: time.nomeTime },
            withCredentials: true,
          },
        ),
      );
      const responses = await Promise.all(promises);

      const jogadoresPorTime = responses.map((response, index) => ({
        nomeTime: times[index].nomeTime,
        jogadores: response.data,
      }));
      if (jogadoresPorTime != 0) {
        setTimesComJogadores(jogadoresPorTime);
        setEditar(true);
      }
      setTimesComJogadores([]);
    } catch {
      console.log('erro buscarJogadoresRelacionadosAoTime');
    }
  };

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

  const editarTimes = () => {
    console.log('Pode editar');
  };

  const getIcon = () => {
    if (times.length < 2) {
      return (
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
      );
    }

    if (editar) {
      return (
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
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
      </svg>
    );
  };

  return (
    <main className="criar-time">
      <Header title={'times'}></Header>
      <div className="times">
        {times.length <= 2 ? <h4>Insira dois times para enviar:</h4> : ''}
        {times.length <= 2 ? (
          <div className="dados-time">
            <form>
              <label htmlFor="">Time</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  type="text"
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
                  value={time.corReferencia}
                  name={`cor${index}`}
                />
              ))}
            </form>
          </div>
        ) : (
          <div className="dados-time">
            <form className="read-only">
              <label htmlFor="">Time</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  readOnly
                  value={time.nomeTime}
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
                  disabled
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
            onClick={
              ativo ? (editar ? editarTimes : enviarTimes) : adicionarInput
            }
          >
            {getIcon()}
          </button>
        </div>
        <span>{mensagem}</span>
      </div>
      <div>
        <ListarTimesComJogadores timesComJogadores={timesComJogadores} />
      </div>
      <div className="botoes-escolha">
        <button>Escolher Times</button>
        <button>Sortear Times</button>
      </div>
    </main>
  );
}
