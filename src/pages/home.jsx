import React, { useState } from "react";

export default function Home() {
  // Definindo o estado para cada contador
  const [blueCount, setBlueCount] = useState(0);
  const [redCount, setRedCount] = useState(0);

  // Função para aumentar o contador da div azul
  const handleBlueClick = () => {
    setBlueCount(blueCount + 1);
  };

  // Função para aumentar o contador da div vermelha
  const handleRedClick = () => {
    setRedCount(redCount + 1);
  };

  // Função para reiniciar os contadores
  const resetCounters = () => {
    setBlueCount(0);
    setRedCount(0);
  };

  // Função para diminuir o contador da div azul
  const decreaseBlueCount = () => {
    if (blueCount > 0) {
      setBlueCount(blueCount - 1);
    }
  };

  // Função para diminuir o contador da div vermelha
  const decreaseRedCount = () => {
    if (redCount > 0) {
      setRedCount(redCount - 1);
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg justify-between items-center gap-4">

        <div className="basis-1/2 bg-blue-500 text-white flex flex-col justify-center items-center h-52 cursor-pointer">
          <div
            className="flex justify-center items-center h-full w-full cursor-pointer"
            onClick={handleBlueClick}
          >
            <span className="text-4xl">{blueCount}</span>
          </div>

          <button
            className="bg-orange-500 text-white py-2 px-4 rounded mt-4"
            onClick={decreaseBlueCount}
          >
            Diminuir Azul
          </button>
        </div>

        <div
          className="w-1.5 bg-gray-600 h-72 rounded-full"
          onClick={resetCounters}
        ></div>

        <div className="basis-1/2 bg-red-500 text-white flex flex-col justify-center items-center h-52 cursor-pointer">
          <div
            className="flex justify-center items-center h-full w-full cursor-pointer"
            onClick={handleRedClick}
          >
            <span className="text-4xl">{redCount}</span>
          </div>

          <button
            className="bg-orange-500 text-white py-2 px-4 rounded mt-4"
            onClick={decreaseRedCount}
          >
            Diminuir Vermelho
          </button>
        </div>
      </div>
    </main>
  );
}
