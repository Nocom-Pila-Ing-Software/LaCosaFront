import React, { useState } from 'react';
import classes from '../styles/form-style.module.css'
import PropTypes from 'prop-types';
import * as api from '../../services.js';

const CreateGameForm = (props) => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [gameCreated, setGameCreated] = useState(false);
  const [createButtonDisabled, setButtonDisabled] = useState(false);

  const handleStartGame = (e) => {

    e.preventDefault();
    api.createGame({ 'roomID': roomID })
    props.onStartGame(hostName);
  };

  const handleCreateRoom = () => {

    if (hostName.trim() === '' || roomName.trim() === '') {
      alert("Por favor, complete ambos campos antes de crear una partida");
      return;
    }
    setGameCreated(true);
    setButtonDisabled(true);

    api.createRoom({
        "roomName": roomName,
        "hostName": hostName,
        "minPlayers": 2, // FIXME no usar valor hardcodeado
        "maxPlayers": 8, // FIXME no usar valor hardcodeado
    })
      .then(data => {
        const roomID = data.roomID;
        setRoomID(roomID);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={classes['form-background']}>
      <h1>LA COSA</h1>
      <form action="" className={classes['form-container']} onSubmit={handleSubmit}>
        <h2>Crear una partida</h2>
        <input
          type="text"
          placeholder="Nombre del anfitrion"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre de la partida"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button disabled={createButtonDisabled} onClick={handleCreateRoom}>Crear partida</button>
        {gameCreated && (<button onClick={handleStartGame}>Iniciar partida</button>)}
      </form>
    </div>
  );
};

CreateGameForm.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default CreateGameForm;
