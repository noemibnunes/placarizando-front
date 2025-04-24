import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TorneioProvider } from './context/torneioContext.jsx';

createRoot(document.getElementById('root')).render(
  <TorneioProvider>
    <App />
  </TorneioProvider>,
);
