import ExternalCard from "./ExternalCard"
import classes from './ExternalHand.module.css'
import { Fragment } from "react"

const ExternalHand = props => {
  return (
    <div className={classes['external-hand-container']}>
      <div className={classes['external-hand-container__hand']}>
        <ExternalCard className={classes.prueba} />
        <ExternalCard />
        <ExternalCard />
        <ExternalCard />
      </div>
      <p>{props.name}</p>
    </div>

  )
}

export default ExternalHand;