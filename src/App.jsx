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
  const [roomID, setRoomID] = useState('')
  const [gameID, setGameID] = useState('')

  const handleStartGame = async (localPlayerName, RoomID, GameID) => {
    try {
      setGameID(GameID);
      setRoomID(RoomID);
      const responsePromise = getRoomInfo(roomID);
      const response = await responsePromise;
      const players = await response.CountPlayers;
      setNOfPlayers(players)
      setLocalPlayer(localPlayerName)
      setGameStarted(true);

    } catch (error) {
      // Maneja los errores aquí
      console.error(error);
    }
  };


  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={nOfPlayers} localName={localPlayer} gameID={gameID} />
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
