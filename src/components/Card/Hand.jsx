import Card from "./Card";
import classes from './Hand.module.css'
import ExternalCard from '../OtherPlayersHands/ExternalCard'
import { Fragment } from "react";
import classesTable from '../Table/Table.module.css'

const Hand = props => {
  return (
    <div className={classesTable.JUGADOR}>
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