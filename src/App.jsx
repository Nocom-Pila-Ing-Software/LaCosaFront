import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Table from './components/Table/Table';
import React, { useState } from 'react';
import { getRoomInfo } from './services';
import LobbyScreenModal from './components/LobbyScreenModal/LobbyScreenModal';

function App() {
  const [roomCreated, setRoomCreated] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [nOfPlayers, setNOfPlayers] = useState(0);
  const [localPlayer, setLocalPlayer] = useState('');

  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const [roomID, setRoomID] = useState('');


  const handleRoomCreated = (createdRoomID, localPlayerName) => {
    setRoomCreated(true);
    setShowLobbyModal(true);
    console.log(roomCreated);
    setRoomID(createdRoomID);
    setLocalPlayer(localPlayerName);
  }

  const handleLeaveRoom = () => {
    setShowLobbyModal(false);
    setRoomID('');
  };
  const [roomIDStarted, setRoomIDStarted] = useState('')
  const [gameID, setGameID] = useState('')

  const handleStartGame = async (localPlayerName, RoomID, GameID) => {
    try {
      setRoomIDStarted(RoomID);
      setGameID(GameID);
      const responsePromise = getRoomInfo(roomIDStarted);
      const response = await responsePromise;
      const players = await response.CountPlayers;
      setNOfPlayers(players);
      setGameStarted(true);
      setLocalPlayer(localPlayerName);
      setShowLobbyModal(false);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Table nOfPlayers={nOfPlayers} localName={localPlayer} gameID={gameID} />
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
          localName ={localPlayer}
      />
      )}
    </div>
  );  
}

export default App;
