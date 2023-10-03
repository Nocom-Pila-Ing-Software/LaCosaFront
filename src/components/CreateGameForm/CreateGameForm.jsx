import React, { useState } from 'react';
import classes from '../styles/form-style.module.css';
import { URL_BACKEND } from '../../utils/constants';
import PropTypes from 'prop-types';
import * as api from '../../services.js';

const CreateGameForm = (props) => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [gameCreated, setGameCreated] = useState(false);

  const handleStartGame = (e) => {
    // Calls the onStartGame function to indicate that the game has started
    e.preventDefault();
    api.createGame({'roomID': roomID})
    props.onStartGame();
  };

  const handleCreateRoom = () => {

    if (hostName.trim()!=='' && roomName.trim()!==''){
      setGameCreated(true);
    }

    api.createRoom({ "roomName": roomName, "hostName": hostName })
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
      <form action="" className={classes['form-container']}onSubmit={handleSubmit}>
        <h2>Crear partida</h2>
        <input
          type="text"
          required
          placeholder="Nombre del anfitrion"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Nombre de la partida"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Crear partida</button>
        {gameCreated && (<button onClick={handleStartGame}>Iniciar partida</button>)}
      </form>
    </div>
  );
};

CreateGameForm.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default CreateGameForm;
