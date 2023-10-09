import classes from './Card.module.css'
import React, { useState } from 'react'
import PropTypes from 'prop-types';


const Card = (props) => {
  const [selectedCard, setSelectedCard] = useState(false);

  const toggleSelectedCard = () => {
    setSelectedCard(!selectedCard);
  };

  const playCard = () => {
    toggleSelectedCard()

    if (selectedCard) {
      setSelectedCard(false);
    } else {
      console.log(props.id);
      console.log(props.name);
      console.log(props.description);

      const { id, name, description } = props;
      props.onCardClick(id, name, description);

    }

  }

  const cardNumber = 'card-' + props.id
  const cardName = 'card-' + props.name.replace(/\s+/g, '-');
  console.log(cardName);

  return (
    <div className={`${classes[cardName]} ${classes[cardNumber]} ${classes.card} ${selectedCard ? classes.selected : ''}`} onClick={playCard}>

    </div>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
}

export default Card;