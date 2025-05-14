import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PlacarPartida from './pages/placar-partida';
import './styles/index.css';
import CriarTime from './pages/criar-time';
import AdicionarJogador from './pages/add-jogador';
import CriarTorneio from './pages/criar-torneio';
import ModoTorneio from './pages/modo-torneio';
import Menu from './pages/menu';
import Partidas from './pages/partidas';
import FormarTime from './pages/formar-time';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partidas" element={<Partidas />} />
        <Route path="/criar-time" element={<CriarTime />} />
        <Route path="/placar-partida" element={<PlacarPartida />} />
        <Route path="/add-jogador" element={<AdicionarJogador />} />
        <Route path="/modo-torneio" element={<ModoTorneio />} />
        <Route path="/criar-torneio" element={<CriarTorneio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/formar-time" element={<FormarTime />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
