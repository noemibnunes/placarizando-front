import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PlacarPartida from './pages/placar-partida';
import './styles/index.css';
import CriarTime from './pages/criar-time';
import AdicionarJogador from './pages/add-jogador';
import CriarTorneio from './pages/criar-torneio';
import Menu from './pages/menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-time" element={<CriarTime />} />
        <Route path="/placar-partida" element={<PlacarPartida />} />
        <Route path="/add-jogador" element={<AdicionarJogador />} />
        <Route path="/criar-torneio" element={<CriarTorneio />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
