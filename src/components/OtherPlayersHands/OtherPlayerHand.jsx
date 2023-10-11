import OtherPlayerCard from './OtherPlayerCard';
import classes from './OtherPlayerHand.module.css'
import React from 'react'
import PropTypes from 'prop-types';

const OtherPlayerHand = props => {
  const textStyle = props.name === 'MUERTO' ? { color: 'red' } : {};


  return (
    <div className={classes['other-player-hand-container']}>
      <div className={classes['other-player-hand-container__hand']}>
        <OtherPlayerCard />
        <OtherPlayerCard />
        <OtherPlayerCard />
        <OtherPlayerCard />
      </div>
      <p style={textStyle}>{props.name}</p>
    </div>

  )
}

OtherPlayerHand.propTypes = {
  name: PropTypes.string.isRequired,
  otherProp: PropTypes.any
}


export default OtherPlayerHand;