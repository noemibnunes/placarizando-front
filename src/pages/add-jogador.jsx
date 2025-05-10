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
    },
  ]);
  const [mensagem, setMensagem] = useState('');
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const adicionarInput = () => {
    setJogadores([
      ...jogadores,
      { nomeJogador: '', nota: '', novoJogador: true },
    ]);
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
            credentials: 'include',
          },
        );
        if (!response.ok) throw new Error('Erro ao buscar jogadores.');

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setJogadores(data);
        } else {
          setJogadores([{}]);
        }
      } catch (error) {
        console.error('Erro ao buscar jogadores:', error.message);
      }
    }

    buscarJogadores();
  }, []);

  const salvarJogadores = async (e) => {
    e.preventDefault();

    const jogadoresValidos = jogadores
      .filter(
        (jogador) => jogador.novoJogador && jogador.nomeJogador?.trim() !== '',
      )
      .map((jogador) => ({
        nomeJogador: jogador.nomeJogador.trim(),
        nota: jogador.nota.trim(),
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
      } else {
        setIsOpen(true);
        setMensagem('Jogadores salvos com sucesso!');
      }

      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setMensagem(error.message || 'Erro desconhecido.');
      }, 2000);
    }
  };

  const deletarJogador = async (index, jogador) => {
    if (!jogador.nomeJogador || jogador.nomeJogador.trim() === '') {
      setJogadores(jogadores.filter((_, i) => i !== index));
    }
  };

  return (
    <main className="criar-jogador">
      <Header title={'jogadores'}></Header>
      <div className="jogador-content">
        <div className="filtro-time">
          <label>Filtrar por time</label>
          <div class="select-wrapper">
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
