import React, { useState } from 'react';
import classes from '../styles/form-style.module.css';
import { URL_BACKEND } from '../../utils/constants';
import PropTypes from 'prop-types';

const CreateGameForm = ({ onStartGame }) => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [gameCreated, setGameCreated] = useState(false);

  const handleStartGame = () => {
    // Calls the onStartGame function to indicate that the game has started
    onStartGame();
  };

  const handleCreateGame = () => {

    if (hostName.trim()!=='' && roomName.trim()!==''){
      setGameCreated(true);
    }

    const json_string = JSON.stringify({
      "roomName": roomName,
      "hostName": hostName
    })

    const requestOptions = {
      method: 'POST',
      headers: new Headers({ 
        'content-type': 'application/json'
      }),
      body: json_string
    }

    fetch(URL_BACKEND + 'room', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response;
      })
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
          placeholder="Nombre del jugador"
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
        <button onClick={handleCreateGame}>Crear partida</button>
        {gameCreated && (<button onClick={handleStartGame}>Iniciar partida</button>)}
      </form>
    </div>
  );
};

CreateGameForm.propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

export default CreateGameForm;