import React, { useState } from 'react';
import classes from '../styles/form-style.module.css';
import { URL_BACKEND } from '../../utils/constants';
import axios from 'axios';
import PropTypes from 'prop-types';

const CreateGameForm = (props) => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [gameCreated, setGameCreated] = useState(false);

  const handleStartGame = (e) => {
    // Calls the onStartGame function to indicate that the game has started
    e.preventDefault();
    axios.post(`${URL_BACKEND}game`, {'roomID': roomID})
    props.onStartGame();
  };

  const handleCreateRoom = () => {

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
        return response.json();
      }
      throw response;
    })
    .then(data => {
      // Assuming data is the JSON response from the server
      const roomID = data.roomID;
      // Call setRoomID with the value of roomID
      setRoomID(roomID);
    })
    .catch(error => {
      // Handle any errors here
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
