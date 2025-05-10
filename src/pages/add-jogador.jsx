import React, { useEffect, useState } from 'react';
import '../styles/time-jogador-style/jogador-style.css';
import '../styles/default-style.css';
import deletar from '../assets/icon-delete.svg';
import add from '../assets/icon-add.svg';
import editar from '../assets/icon-edit.svg';
import Header from '../components/Header';
import ModalFeedback from '../components/ModalFeedback';

export default function CriarJogador() {
  const [jogadores, setJogadores] = useState([
    {
      nomeJogador: '',
      nota: '',
      isNovo: true,
    },
  ]);

  const [mensagem, setMensagem] = useState('');
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeTime = (event) => {
    setTime(event.target.value);
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
  }, []);

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

  const salvarJogadores = async (e) => {
    e.preventDefault();

    const jogadoresValidos = jogadores
      .filter((j) => j.isNovo && j.nomeJogador.trim() !== '')
      .map((jogador) => ({
        nomeJogador: jogador.nomeJogador.trim(),
        nota: jogador.nota?.trim() || '',
      }));

    try {
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar jogadores.');
      }

      setMensagem('Jogadores salvos com sucesso!');
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
      buscarJogadores();
    } catch (error) {
      setMensagem(error.message || 'Erro desconhecido.');
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  };

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

  return (
    <main className="criar-jogador">
      <Header title={'jogadores'}></Header>
      <div className="jogador-content">
        <div className="filtro-time">
          <label>Filtrar por time</label>
          <div className="select-wrapper">
            <select name="select" onChange={handleChangeTime}>
              <option value="selecione">Selecione</option>
              <option>time1</option>
            </select>
          </div>
        </div>

        <form onSubmit={salvarJogadores}>
          <div className="labels">
            <label>Nome</label>
            <label>Nota</label>
          </div>
          {jogadores.map((jogador, index) => (
            <div className="jogador-nota">
              <input
                className="jogador"
                type="text"
                value={jogador.nomeJogador || ''}
                onChange={(e) => handleChangeNome(index, e.target.value)}
                name={`nome${index}`}
              />

              <input
                className="nota"
                type="text"
                value={jogador.nota || ''}
                onChange={(e) => handleChangeNota(index, e.target.value)}
                name={`nota${index}`}
              />

              <img
                className="icon-delete"
                src={deletar}
                alt="Icon de deletar"
                onClick={(e) => deletarJogador(e, jogador.idJogador)}
              />

              <img className="icon-edit" src={editar} alt="Icon de editar" />
            </div>
          ))}
          <div className="btn-add-wrapper">
            <button type="button" className="btn-add" onClick={adicionarInput}>
              <img className="icon-add" src={add} alt="Icon de adicionar" />
            </button>
          </div>

          <div className="footer">
            <div className="btn-salvar">
              <button type="submit">Salvar</button>
            </div>
            <ModalFeedback
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              mensagem={mensagem}
            />
            {/* {mensagem && <span className="cliquei">{mensagem}</span>} */}
          </div>
        </form>
      </div>
    </main>
  );
}
