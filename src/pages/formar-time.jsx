import { useEffect, useState } from 'react';
import '../styles/time-jogador-style/formar-time-style.css';
import '../styles/default-style.css';
import Header from '../components/Header';
import ModalFeedback from '../components/ModalFeedback';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FormarTime() {
  const location = useLocation();
  const [mensagem, setMensagem] = useState('');
  const [estado, setEstado] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [jogadoresComTimesVinculados, setJogadoresComTimesVinculados] =
    useState({});
  const times = location.state?.times || [];
  const [jogadores, setJogadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarJogadores = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/jogador/buscarJogadores',
          {
            withCredentials: true,
          },
        );

        setJogadores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    buscarJogadores();
  }, []);

  const handleSelectChange = (indexJogador, idJogador, idTime) => {
    setJogadoresComTimesVinculados((prev) => ({
      ...prev,
      [indexJogador]: {
        idTime,
        idJogador,
      },
    }));
  };

  const handleSalvar = async () => {
    setIsOpen(true);
    const vinculos = Object.entries(jogadoresComTimesVinculados).map(
      ([chave, { idTime, idJogador }]) => {
        const [indexTime, indexJogador] = chave.split('-');
        return {
          idJogador, // ID do jogador
          idTime, // ID do time selecionado
        };
      },
    );

    try {
      for (const vinculo of vinculos) {
        await axios.patch(
          `http://localhost:8080/jogador/vincularJogadorATime/${vinculo.idTime}/${vinculo.idJogador}`,
          {},
          {
            withCredentials: true,
          },
        );
      }

      setMensagem('Jogadores vinculados ao seus respectivos times!');
      setEstado('sucesso');
      setTimeout(() => {
        navigate('/criar-time');
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao vincular jogadores:', error);
    }
  };

  return (
    <main className="formar-time">
      <Header title={'Formar Time'} />
      <div className="jogadores-time">
        {jogadores.map((jogador, indexJogador) => (
          <div className="linha-jogador" key={indexJogador}>
            <input
              disabled
              readOnly
              value={jogador.nomeJogador}
              name={`jogador${indexJogador}`}
            />
            <div className="time-select-wrapper">
              <select
                value={jogadoresComTimesVinculados[indexJogador]?.idTime || ''}
                onChange={(e) =>
                  handleSelectChange(
                    indexJogador,
                    jogador.idJogador,
                    e.target.value,
                  )
                }
              >
                <option value="">Escolha o Time</option>
                {times.map((t, idx) => (
                  <option key={t.idTime || idx} value={t.idTime}>
                    {t.nomeTime}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSalvar}>Salvar</button>
      <ModalFeedback isOpen={isOpen} mensagem={mensagem} estado={estado} />
    </main>
  );
}
