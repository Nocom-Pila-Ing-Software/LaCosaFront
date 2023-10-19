import React, { useState } from 'react'
import classes from '../styles/form-style.module.css';
import Modal from './JoinGameFormModal';

const JoinGameForm = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(false);
  const [roomID, setRoomID] = useState(-1);
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();


    if (roomID.trim() !== '' && playerName.trim() !== '') {
      api.addPlayerToWaitingRoom(roomID, { 'playerName': playerName })
        .then((response) => {
          openModal();
          props.onRoomCreated(roomID, playerName);
          if (response && response.ok) {
            console.log(response);
          }
        })
        .catch((error) => {
          if(error.response && error.response.status === 404){ 
            console.log("La sala no existe");
            alert('La sala no existe, introduce una ID de sala existente.');
          } else if(error.response && error.response.status === 400){
            if(error.response.data && error.response.data.detail === "Game has already started"){
              console.log("El juego ya ha comenzado, no puedes unirte.");
              alert('El juego ya ha comenzado, no puedes unirte.');
            }else{
            console.log("El nombre de jugador introducido ya existe, por favor ingrese otro.");
            alert('El nombre de jugador introducido ya existe, por favor ingrese otro.');
            }
          }
        })} else {
          alert('Por favor ingresa ID de partida y un nombre de jugador.');
        }
  }

  const openModal = () => {
    setIsModalOpen(true);
    setIsJoinButtonDisabled(true);
    }

  const closeModal = () => {
    setIsModalOpen(false);
    setIsJoinButtonDisabled(false);
  }

  return (
    <div className={classes['form-background']}>
      <form action="" className={classes['form-container']} onSubmit={handleSubmit}>
        <h2>Unirse a una partida</h2>
        <input type="text" required placeholder='Nombre del jugador' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        <button onClick={openModal} disabled={isJoinButtonDisabled}>Ver Listas De partidas</button>
        {isModalOpen && <Modal playerName={playerName} closeModal={closeModal}/>}
      </form>
    </div>
  )
}

JoinGameForm.propTypes = {
  onRoomCreated: PropTypes.func.isRequired,
}

export default JoinGameForm;
