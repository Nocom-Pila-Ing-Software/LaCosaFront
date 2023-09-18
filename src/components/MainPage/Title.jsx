import React from 'react'
import classes from './Title.module.css'


const Title = () => {
  return (
    <div className={classes.title}>
      <h1>La cosa</h1>
      <p className={classes.title__p1}>¿PUEDES CONFIAR EN TUS AMIGOS?</p>
      <p>UN JUEGO DE TERROR CONTAGIOSO</p>
    </div>
  )
}

export default Title;