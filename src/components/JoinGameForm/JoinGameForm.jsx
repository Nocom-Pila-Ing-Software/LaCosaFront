import React from 'react'
import classes from '../styles/form-style.module.css';

const JoinGameForm = () => {
  return (
    <div className={classes['form-background']}>

      <form action="" className={classes['form-container']}>
        <h2>Unirse a una partida</h2>
        <input type="text" name="" id="" required placeholder='Nombre del jugador' />
        <input type="text" required placeholder='Nombre de la partida' />
        <button>Unirse</button>
      </form>
    </div>
  )
}

export default JoinGameForm;