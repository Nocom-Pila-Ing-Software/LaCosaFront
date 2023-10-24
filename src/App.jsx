import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Table from './components/Table/Table';
import React, { useState } from 'react';
import { getRoomInfo } from './services';
import LobbyScreenModal from './components/LobbyScreenModal/LobbyScreenModal';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [nOfPlayers, setNOfPlayers] = useState(0);
  const [localPlayer, setLocalPlayer] = useState('');
  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const [roomID, setRoomID] = useState('');
  const [idPlayer, setIdPlayer] = useState(-1);

  const handleRoomCreated = (createdRoomID, localPlayerName, idPlayer) => {
    setShowLobbyModal(true);
    setRoomID(createdRoomID);
    setLocalPlayer(localPlayerName);
    setIdPlayer(idPlayer);
  }

  const handleLeaveRoom = () => {
    setShowLobbyModal(false);
    setRoomID('');
  };

  const handleStartGame = async () => {
    try {
      const responsePromise = getRoomInfo(1);
      const response = await responsePromise;
      const players = await response.CountPlayers;
      setNOfPlayers(players);
      setGameStarted(true);
      setShowLobbyModal(false);

    } catch (error) {
      console.error(error);
    }
  };

  const gameEnded = () => {
    setGameStarted(false);
    alert("Volviendo a la pantalla de inicio");
  }

  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={nOfPlayers} localName={localPlayer} onGameEnd={gameEnded} />
      ) : (
        <>
          <CreateGameForm onRoomCreated={handleRoomCreated} />
          <JoinGameForm onRoomCreated={handleRoomCreated}/>
        </>
      )}
      {showLobbyModal && 
      (<LobbyScreenModal
          roomID={roomID}
          onStartGame={handleStartGame}
          onLeave={handleLeaveRoom}
          localName={localPlayer}
          idPlayer={idPlayer}
      />
      )}
    </div>
  );  
}

export default App;
