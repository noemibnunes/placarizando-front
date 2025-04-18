import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PlacarPartida from './pages/placar-partida';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placar-partida" element={<PlacarPartida />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
