import classes from './Deck.module.css'
import React from 'react'

const Deck = () => {

  return (
    <div className={classes['table-cards']}>
      <div className={classes['last-played']}></div>
      <div className={classes.deck}>
        <div className={classes['deck-card']}></div>
        <div className={classes['deck-card']}></div>
        <div className={classes['deck-card']}></div>
        <div className={classes['deck-card']}></div>
        <div className={classes['deck-card']}></div>
        <div className={classes['deck-card']}></div>

      </div>
    </div>
  )
}

export default Deck