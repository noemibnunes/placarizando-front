import '../styles/torneio-style/torneio.css';
import placar from '../assets/placar.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CriarTorneio() {
  const [codigoUnico, setCodigoUnico] = useState();
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const gerarCodigo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/torneio', {
          withCredentials: true,
        });
        setCodigoUnico(response.data);
      } catch {
        console.log('erro');
      }
    };
    gerarCodigo();
  }, []);

  const navigate = useNavigate();

  const copiarCodigo = async () => {
    setAtivo(true);
    await navigator.clipboard.writeText(codigoUnico);

    setTimeout(() => {
      setAtivo(false);
    }, 2000);
  };

  return (
    <main className="torneio">
      <div className="cabecalho">
        <img src={placar} alt="placar" />
        <span>modo torneio</span>
      </div>
      <h4>
        Guarde esse código para acessar as informações sobre o torneio
        posteriormente
      </h4>
      <span className="ativo">{ativo ? 'Texto copiado' : ''}</span>
      <div className="codigoUnico">
        <span>{codigoUnico}</span>
        <a onClick={copiarCodigo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke=" #fff"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
            />
          </svg>
        </a>
      </div>
      <button onClick={() => navigate('/menu')}>Próximo</button>
    </main>
  );
}
