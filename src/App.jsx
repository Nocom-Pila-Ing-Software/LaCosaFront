import './App.css';
import JoinGameForm from './components/JoinGameForm/JoinGameForm';
import CreateGameForm from './components/CreateGameForm/CreateGameForm';
import Table from './components/Table/Table';
import React, { useState } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [roomID, setRoomID] = useState(-1);
  const [playerID, setPlayerID] = useState(-1);


  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Table playerID={playerID} roomID={roomID} nOfPlayers={2}/>
      ) : (
        <>
          {/*Maybe we should use useContext here?*/}
          <CreateGameForm
            onStartGame={handleStartGame}
            roomID={roomID}
            setRoomID={setRoomID}
            setPlayerID={setPlayerID}/>
          <JoinGameForm
            onStartGame={handleStartGame}
            setRoomID={setRoomID}
            setPlayerID={setPlayerID}/>
        </>
      )}
    </div>
  );
}

export default App;
