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



  const handleRoomCreated = (createdRoomID, localPlayerName) => {
    setShowLobbyModal(true);
    setRoomID(createdRoomID);
    setLocalPlayer(localPlayerName);
  }

  const handleLeaveRoom = () => {
    setShowLobbyModal(false);
    setRoomID('');
  };

  const handleStartGame = async (localPlayerName) => {
    try {
      const responsePromise = getRoomInfo(1);
      const response = await responsePromise;
      const players = await response.CountPlayers;
      setNOfPlayers(players);
      setGameStarted(true);
      setLocalPlayer(localPlayerName);
      console.log(localPlayerName);
      setShowLobbyModal(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={nOfPlayers} localName={localPlayer}/>
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
      />
      )}
    </div>
  );  
}

export default App;
