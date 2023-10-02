import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Table from './components/Table/Table'; // Asegúrate de importar el componente Table
import React, { useState } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    // Cambia el estado de la partida a "iniciada" cuando se hace clic en el botón "Iniciar partida"
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={4}/>
      ) : (
        <>
          <CreateGameForm onStartGame={handleStartGame} />
          <JoinGameForm />
        </>
      )}
    </div>
  );
}

export default App;