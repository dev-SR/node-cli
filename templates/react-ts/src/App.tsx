import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl text-yellow-300">🚀 Vite + React + Typescript 🚀</h1>
        <h1 className="text-3xl text-white">&#38;</h1>
        <h1 className="text-3xl text-yellow-100">
          🌟 TailwindCSS 🌟 + Eslint + Prettier
        </h1>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="bg-yellow-400 rounded px-4 py-2 text-2xl hover:bg-yellow-500 transition duration-300 ease-in-out">
          Clicked {count} times
        </button>
      </div>
    </div>
  );
}

export default App;
