import React, { useState, useEffect } from 'react';
import '../styles/time-jogador-style/time-style.css';
import axios from 'axios';
import ListarTimesComJogadores from '../components/ListarTimesComJogadores';
import Header from '../components/Header';
import ModalFeedback from '../components/ModalFeedback';
import { useNavigate } from 'react-router-dom';
import FormarTime from './formar-time';

export default function CriarTime() {
  const [mensagem, setMensagem] = useState('');
  const [acao, setAcao] = useState('adicionar');
  const [carregouTimes, setCarregouTimes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [temTimesCadastrados, setTemTimesCadastrados] = useState(false);
  const navigate = useNavigate();

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

  const adicionarInput = () => {
    setAcao('enviar');
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

        if (response.data.length === 0) {
          setAcao('adicionar');
        }
        setTemTimesCadastrados(true);
        setTimes(response.data);
        setAcao('desabilitar');
      } catch {
        setAcao('adicionar');
      } finally {
        setCarregouTimes(true);
      }
    };
    buscarTimes();
  }, []);

  useEffect(() => {
    const todosTemId = times.length >= 2 && times.every((t) => t.idTime);
    if (todosTemId) {
      buscarJogadoresPorTime();
    }
  }, [times]);

  const buscarJogadoresPorTime = async () => {
    try {
      const promises = times.map((time) =>
        axios.get(
          `http://localhost:8080/jogador/buscarJogadoresPorTime/${time.idTime}`,
          {
            withCredentials: true,
          },
        ),
      );
      const responses = await Promise.all(promises);

      const jogadoresPorTime = responses.map((response, index) => ({
        idTime: times[index].idTime,
        nomeTime: times[index].nomeTime,
        jogadores: response.data,
      }));
      if (jogadoresPorTime.length > 0) {
        setTimesComJogadores(jogadoresPorTime);
        console.log(timesComJogadores);
      } else {
        setTimesComJogadores([{ nomeTime: '', jogadores: [] }]);
      }
    } catch (error) {
      setMensagem(error.response.data);
    }
  };

  const enviarTimes = async (e) => {
    setIsOpen(true);
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
        setMensagem(response.data);
        setAcao('desabilitar');
        setStatus('sucesso');
        setTemTimesCadastrados(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    } catch (error) {
      setStatus('erro');
      setMensagem(error.response.data);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  const formarTime = (times) => {
    navigate('/formar-time', { state: { times } });
  };

  const sortearTimes = async () => {
    setIsOpen(true);

    try {
      const response = await axios.get(
        'http://localhost:8080/time/sortearTimes',
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        setMensagem(response.data);
        setStatus('sucesso');
        setTimeout(() => {
          setIsOpen(false);
          buscarJogadoresPorTime();
        }, 2000);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const getButton = () => {
    if (acao === 'adicionar') {
      return (
        <button
          type="button"
          className={`btn-add ${acao}`}
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
      );
    }

    if (acao === 'enviar') {
      return (
        <button
          type="button"
          disabled={acao === 'desabilitar'}
          className={`btn-add ${acao}`}
          onClick={enviarTimes}
        >
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
        </button>
      );
    }
  };

  return (
    <main className="criar-time">
      <Header title={'times'}></Header>
      <div className="times">
        {!temTimesCadastrados ? <h4>Insira dois times para enviar:</h4> : ''}
        {!temTimesCadastrados ? (
          <div className="dados-time">
            <form>
              <label htmlFor="">Time</label>
              {times.map((time, index) => (
                <input
                  key={index}
                  type="text"
                  value={time.nomeTime}
                  name={`nome${index}`}
                  onChange={(e) => handleNomeTime(index, e.target.value)}
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
                  onChange={(e) => handleCor(index, e.target.value)}
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
        <div className="btn-add-wrapper">{getButton()}</div>
        <div>
          {timesComJogadores.length > 1 ? (
            <ListarTimesComJogadores timesComJogadores={timesComJogadores} />
          ) : null}
        </div>
        <ModalFeedback isOpen={isOpen} estado={status} mensagem={mensagem} />
      </div>
      {timesComJogadores.length >= 2 &&
        timesComJogadores[0].jogadores.length < 6 &&
        timesComJogadores[1].jogadores.length < 6 && (
          <div className="botoes-escolha">
            <button onClick={() => formarTime(times)}>Formar Time</button>
            <button onClick={() => sortearTimes()}>Sortear Times</button>
          </div>
        )}
    </main>
  );
}
