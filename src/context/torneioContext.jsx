import { createContext, useContext, useState } from 'react';

const TorneioContext = createContext();

export const useTorneio = () => useContext(TorneioContext);

export function TorneioProvider({ children }) {
  const [codigoUnico, setCodigoUnico] = useState(null);

  return (
    <TorneioContext.Provider value={{ codigoUnico, setCodigoUnico }}>
      {children}
    </TorneioContext.Provider>
  );
}
