import React from 'react';
import classes from './Card.module.css'
import PropTypes from 'prop-types';


const Card = (props) => {

  const playCard = () => {
    const { id, name, description } = props;
    props.onCardClick(id, name, description);

  }

  const cardName = 'card-' + props.name.replace(/\s+/g, '-');
  return (
    <div className={`${classes[cardName]} ${classes.card} ${props.id === props.selectedCardID ? classes.selected : ''}`} onClick={playCard}>

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