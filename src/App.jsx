import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Table from './components/Table/Table';
import React, { useState } from 'react';
import { getRoomInfo } from './services';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [nOfPlayers, setNOfPlayers] = useState(0)
  const [localPlayer, setLocalPlayer] = useState('')

  const handleStartGame = async (localPlayerName) => {
    try {
      const responsePromise = getRoomInfo(1);
      const response = await responsePromise;
      const players = await response.CountPlayers;
      setNOfPlayers(players)
      setLocalPlayer(localPlayerName)
      setGameStarted(true);
      console.log("El juego se inicio para " + localPlayerName)

    } catch (error) {
      // Maneja los errores aquí
      console.error(error);
    }
  };


  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={nOfPlayers} localName={localPlayer} />
      ) : (
        <>
          <CreateGameForm onStartGame={handleStartGame} />
          <JoinGameForm onStartGame={handleStartGame} />
        </>
      )}
    </div>
  );
}

export default App;
