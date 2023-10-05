import React, { useState } from 'react'
import classes from '../styles/form-style.module.css';
import Modal from './JoinGameFormModal';
import * as api from '../../services.js';

const JoinGameForm = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(false);
  const [roomID, setRoomID] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addPlayerToWaitingRoom(roomID, { 'playerName': playerName })
      .then((response) => {
        openModal();
        if (response.ok) {
          console.log(response);
        }
        pollRoom()

      })
      .catch((error) => {
        closeModal();
        console.log(error);
        console.log("La sala no existe");
        alert('La sala no existe');
      })
  }
  const pollRoom = () => {
    api.getRoomInfo(roomID)
      .then((data) => {
        if (data.hasStarted) {
          props.onStartGame(playerName)
        } else {
          // The game hasn't started yet, continue polling after 3 seconds.
          setTimeout(pollRoom, 3000);
        }
      })
  }


  const openModal = () => {
    if (roomID.trim() !== '' && playerName.trim() !== '') {
      setIsModalOpen(true);
      setIsJoinButtonDisabled(true);
    } else {
      alert('Por favor ingresa un nombre de partida y un nombre de jugador');
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsJoinButtonDisabled(false);
  };


  return (
    <div className={classes['form-background']}>
      <form action="" className={classes['form-container']} onSubmit={handleSubmit}>
        <h2>Unirse a una partida</h2>
        <input type="text" required placeholder='Nombre del jugador' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        <input type="text" required placeholder='ID de la partida' value={roomID} onChange={(e) => setRoomID(e.target.value)} />
        <button onClick={handleSubmit} disabled={isJoinButtonDisabled}>Unirse</button>
        {isModalOpen && <Modal closeModal={closeModal} />}
      </form>
    </div>
  )
}

export default JoinGameForm;
