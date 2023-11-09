import React, { useState } from 'react';
import classes from './Card.module.css'
import PropTypes from 'prop-types';

const Card = (props) => {
  const playCard = () => {
    const { id, name, description } = props;
    props.onCardClick(id, name, description);
  }
  const cardName = 'card-' + props.name.replace(/\s+/g, '-');
  const isPlayable = props.cardsToPlay.some(card => card.name === props.name && card.playable === true)
  const isTradeable = props.cardsToTrade.some(card => card.name === props.name && card.usable)
  const canDefend = props.cardsToDefend.some(card => card.name === props.name && card.usable === true)
  return (
    <div className={`${classes[cardName]} 
    ${classes.background_img} 
    ${classes.card} 
    ${props.id === props.selectedCardID ? classes.selected : ''}
    ${((isTradeable || isPlayable)) ? classes.canPlay : classes.cannotPlay}
    `}
      onClick={playCard}>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  selectedCardID: PropTypes.number.isRequired,
}

export default Card;
