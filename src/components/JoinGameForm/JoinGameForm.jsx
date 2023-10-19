import React, { useState } from 'react'
import classes from '../styles/form-style.module.css';
import Modal from './JoinGameFormModal';

const JoinGameForm = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinButtonDisabled, setIsJoinButtonDisabled] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  

  const openModal = (e) => {
    e.preventDefault();
    if (playerName.trim() == '') {
      alert('Por favor ingresa un nombre de jugador.'); 
    }else{ 
    setIsModalOpen(true);
    setIsJoinButtonDisabled(true);
    }
  };

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


export default JoinGameForm;
