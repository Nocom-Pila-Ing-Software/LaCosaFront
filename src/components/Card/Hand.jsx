import Card from "./Card";
import classes from './Hand.module.css'
import HandClass from '../Table/Table.module.css'
import React from 'react'

const Hand = props => {
  return (
    <div className={HandClass.PLAYER}>
      <div className={classes.buttons}>
        <button>Jugar Carta</button>
        <button>Descartar Carta</button>
      </div>

      <div className={classes['hand-container__hand']}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <p>{props.name}</p>
    </div>

  )
}

export default Hand;