import { useEffect, useState } from 'react';
import '../styles/time-jogador-style/jogador-style.css';
import '../styles/default-style.css';
import deletar from '../assets/icon-delete.svg';
import add from '../assets/icon-add.svg';
import editar from '../assets/icon-edit.svg';
import Header from '../components/Header';
import ModalFeedback from '../components/ModalFeedback';

export default function CriarJogador() {
  const [mensagem, setMensagem] = useState('');
  const [time, setTime] = useState('');
  const [times, setTimes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [jogadoresEditando, setJogadoresEditando] = useState([]);

  const [jogadores, setJogadores] = useState([
    {
      nomeJogador: '',
      nota: '',
      isNovo: true,
    },
  ]);

  const handleChangeTime = (event) => {
    const nomeTime = event.target.value;
    setTime(nomeTime);

    if (nomeTime === 'selecione') {
      buscarJogadores();
    } else if (nomeTime) {
      buscarJogadoresPeloTime(nomeTime);
    }
  };

  const adicionarInput = () => {
    setJogadores((prev) => [
      ...prev,
      { nomeJogador: '', nota: '', isNovo: true },
    ]);
  };

  const handleChangeNome = (index, value) => {
    const atualizados = [...jogadores];
    atualizados[index].nomeJogador = value;
    setJogadores(atualizados);
  };

  const handleChangeNota = (index, value) => {
    const atualizados = [...jogadores];
    atualizados[index].nota = value;
    setJogadores(atualizados);
  };

  useEffect(() => {
    buscarJogadores();
    buscarTimes();
  }, []);

  const toggleEdicao = (idJogador) => {
    setJogadoresEditando((prev) =>
      prev.includes(idJogador)
        ? prev.filter((id) => id !== idJogador)
        : [...prev, idJogador],
    );
  };

  // BUSCAR JOGADORES ==================================================
  const buscarJogadores = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/jogador/buscarJogadores`,
        { credentials: 'include' },
      );
      if (!response.ok) throw new Error('Erro ao buscar jogadores.');

      const data = await response.json();
      const dataComFlag = data.map((jogador) => ({
        ...jogador,
        isNovo: false,
      }));

      setJogadores(dataComFlag);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error.message);
    }
  };

  // SALVAR JOGADORES ==================================================
  const salvarJogadores = async (e) => {
    e.preventDefault();

    const jogadoresValidos = jogadores
      .filter((j) => j.isNovo && j.nomeJogador.trim() !== '')
      .map((jogador) => ({
        nomeJogador: jogador.nomeJogador.trim(),
        nota: jogador.nota?.trim() || '',
      }));

    try {
      setIsOpen(true);
      const response = await fetch(
        `http://localhost:8080/jogador/criarJogador`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(jogadoresValidos),
        },
      );

      if (!response.ok) {
        setStatus('erro');
        setMensagem('Erro ao salvar jogadores.');
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar jogadores.');
      }

      setMensagem('Jogador(es) salvo(s) com sucesso!');
      setStatus('sucesso');
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
      buscarJogadores();
    } catch (error) {
      setStatus('erro');
      setMensagem(error.message || 'Erro desconhecido.');
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  };

  // ALTERAR JOGADORES ==================================================
  const alterarVariosJogadores = async (e) => {
    setIsOpen(true);
    e.preventDefault();

    const jogadoresParaEditar = jogadores.filter((j) =>
      jogadoresEditando.includes(j.idJogador),
    );

    for (const jogador of jogadoresParaEditar) {
      const payload = {
        nomeJogador: jogador.nomeJogador.trim(),
        nota: jogador.nota ?? '',
      };

      try {
        const response = await fetch(
          `http://localhost:8080/jogador/alterarJogador/${jogador.idJogador}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          setStatus('erro');
          setMensagem('Erro ao salvar jogadores.');
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao editar jogadores.');
        }

        setMensagem('Jogador(es) editado(s) com sucesso!');
        setStatus('sucesso');
        setJogadoresEditando([]);
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
        buscarJogadores();
      } catch (error) {
        setStatus('erro');
        setMensagem(error.message || 'Erro desconhecido.');
        setIsOpen(true);
        setJogadoresEditando([]);
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    }
  };

  // EXCLUIR JOGADORES ==================================================
  const deletarJogador = async (e, idJogador) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/jogador/deletarJogador/${idJogador}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) throw new Error('Erro ao deletar jogador!');

      setJogadores(
        jogadores.filter((jogador) => jogador.idJogador !== idJogador),
      );
    } catch (error) {
      console.error('Erro ao deletar jogador:', error.message);
    }
  };

  // BUSCAR TIMES ==================================================
  const buscarTimes = async () => {
    try {
      const response = await fetch('http://localhost:8080/time', {
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Erro ao buscar times.');

      const data = await response.json();
      setTimes(data);
    } catch (error) {
      console.error('Erro ao buscar times:', error.message);
    }
  };

  // BUSCAR JOGADORES ATRAVÉS DO TIME ==================================================
  const buscarJogadoresPeloTime = async (nomeTime) => {
    const timeFiltrado = times.find((time) => time.nomeTime === nomeTime);

    if (!timeFiltrado) return;

    try {
      const response = await fetch(
        `http://localhost:8080/jogador/buscarJogadoresPorTime/${timeFiltrado.idTime}`,
        {
          credentials: 'include',
        },
      );

      if (!response.ok) throw new Error('Erro ao buscar jogadores.');
      if (response.status === 204) {
        setJogadores([]);
        return;
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const dataComFlag = data.map((jogador) => ({
          nomeJogador: jogador.nomeJogador,
          nota: jogador.nota,
          isNovo: false,
        }));
        setJogadores(dataComFlag);
      } else if (data.mensagem) {
        setJogadores([]);
        setMensagem(data.mensagem);
        setStatus('info');
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 2000);
      }
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error.message);
    }
  };

  return (
    <main className="criar-jogador">
      <Header title={'jogadores'}></Header>
      <div className="jogador-content">
        <div className="filtro-time">
          <label>Filtrar por time</label>
          <div className="select-wrapper">
            <select name="select" onChange={handleChangeTime} value={time}>
              <option value="selecione">Todos os Times</option>
              {times.map((t) => (
                <option key={t.idTime} value={t.nomeTime}>
                  {t.nomeTime}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={salvarJogadores}>
          <div className="labels">
            <label>Nome</label>
            <label>Nota</label>
          </div>
          {jogadores.map((jogador, index) => (
            <div key={jogador.idJogador || index} className="jogador-nota">
              <input
                className="jogador"
                type="text"
                value={jogador.nomeJogador || ''}
                onChange={(e) => handleChangeNome(index, e.target.value)}
                name={`nome${index}`}
                disabled={
                  !jogador.isNovo &&
                  !jogadoresEditando.includes(jogador.idJogador)
                }
              />

              <input
                className="nota"
                type="text"
                value={jogador.nota || ''}
                onChange={(e) => handleChangeNota(index, e.target.value)}
                name={`nota${index}`}
                disabled={
                  !jogador.isNovo &&
                  !jogadoresEditando.includes(jogador.idJogador)
                }
              />

              <img
                className="icon-delete"
                src={deletar}
                alt="Icon de deletar"
                onClick={(e) => deletarJogador(e, jogador.idJogador)}
              />

              <img
                className="icon-edit"
                src={editar}
                alt="Icon de editar"
                onClick={() => toggleEdicao(jogador.idJogador)}
              />
            </div>
          ))}
          <div className="btn-add-wrapper">
            <button type="button" className="btn-add" onClick={adicionarInput}>
              <img className="icon-add" src={add} alt="Icon de adicionar" />
            </button>
          </div>

          <div className="footer">
            <div className="btn-salvar">
              <button
                type="submit"
                onClick={(e) => {
                  if (jogadoresEditando.length > 0) {
                    alterarVariosJogadores(e);
                  } else {
                    salvarJogadores(e);
                  }
                }}
              >
                {jogadoresEditando.length > 0
                  ? 'Editar selecionados'
                  : 'Salvar'}
              </button>
            </div>
            <ModalFeedback
              isOpen={isOpen}
              estado={status}
              mensagem={mensagem}
            />
            {/* {mensagem && <span className="cliquei">{mensagem}</span>} */}
          </div>
        </form>
      </div>
    </main>
  );
}
