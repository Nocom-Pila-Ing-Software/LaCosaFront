import OtherPlayerCard from './OtherPlayerCard';
import classes from './OtherPlayerHand.module.css'
import React from 'react'

const OtherPlayerHand = props => {
  return (
    <div className={classes['other-player-hand-container']}>
      <div className={classes['other-player-hand-container__hand']}>
        <OtherPlayerCard />
        <OtherPlayerCard />
        <OtherPlayerCard />
        <OtherPlayerCard />
      </div>
      <p>{props.name}</p>
    </div>

  )
}

export default OtherPlayerHand;