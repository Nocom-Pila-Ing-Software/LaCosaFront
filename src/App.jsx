import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Table from './components/Table/Table';
import React, { useState } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {

    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={2}/>
      ) : (
        <>
          <CreateGameForm onStartGame={handleStartGame} />
          <JoinGameForm onStartGame={handleStartGame}/>
        </>
      )}
    </div>
  );
}

export default App;
