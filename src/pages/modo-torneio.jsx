import '../styles/torneio-style/torneio.css';
import placar from '../assets/placar.svg';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalFeedback from '../components/ModalFeedback';

export default function ModoTorneio() {
  const [codigoTorneio, setCodigoTorneio] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const validaTorneio = async (e) => {
    e.preventDefault();

    try {
      setIsOpen(true);
      const response = await axios.post(
        'http://localhost:8080/torneio/buscarTorneio',
        { codigoTorneio: codigoTorneio },
        {
          withCredentials: true,
          timeout: 1000,
        },
      );

      if (response.status === 202) {
        setMensagem(response.data);
        setStatus('sucesso');
        setTimeout(() => {
          navigate('/menu');
        }, 2000);
      }
    } catch (error) {
      if (error.status === 404) {
        setMensagem(error.response.data);
        setStatus('erro');
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else {
        setMensagem('Ocorreu um erro inesperado, tente novamente!');
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    }
  };

  return (
    <main className="torneio">
      <div className="cabecalho">
        <img src={placar} alt="placar" />
        <span>modo torneio</span>
      </div>
      <h4>Insira o código para visualizar informações sobre seu torneio.</h4>
      <div className="inserirCodigo">
        <form onSubmit={validaTorneio}>
          <label htmlFor="codigo">Código:</label>
          <input
            id="codigo"
            name="codigo"
            value={codigoTorneio}
            type="text"
            onChange={(e) => setCodigoTorneio(e.target.value)}
          ></input>
          <button type="submit">Próximo</button>
        </form>
      </div>
      <p>ou</p>
      <a className="buscarTorneio" onClick={() => navigate('/criar-torneio')}>
        Criar Torneio.
      </a>
      <ModalFeedback isOpen={isOpen} estado={status} mensagem={mensagem} />
    </main>
  );
}
