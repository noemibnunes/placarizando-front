import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PlacarPartida from './pages/placar-partida';
import './styles/index.css';
import CriarTime from './pages/criar-time';
import CriarJogador from './pages/criar-jogador';
import CriarTorneio from './pages/criar-torneio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-time" element={<CriarTime />} />
        <Route path="/placar-partida" element={<PlacarPartida />} />
        <Route path="/criar-jogador" element={<CriarJogador />} />
        <Route path="/criar-torneio" element={<CriarTorneio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
