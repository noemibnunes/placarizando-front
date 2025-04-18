import '../styles/home-style/home-style.css';
import logo from '../assets/placarizando-logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const navigateCriarTime = () => {
    navigate('/criar-time');
  };

  const navigateIniciarPartida = () => {
    navigate('/placar-partida');
  };

  return (
    <main className="home">
      <div className="home-content">
        <img src={logo} alt="Logo do jogo" />
        <button onClick={navigateIniciarPartida}>iniciar partida</button>
        <button onClick={navigateCriarTime}>criar time</button>
        <button>criar jogadores</button>
      </div>
    </main>
  );
}
