import Card from '../PlayerHand/Card';
import classes from '../Table/Table.module.css'
import PropTypes from 'prop-types';

const ModalCards = (props) => {
  return (
    <div className={classes['overlay']}>
			<h1>Cartas</h1>
			<ul>
        {props.hand.map((card) => (
          <li key={card.cardID}>
            <div>
						<Card
              key={card.cardID}
              id={card.cardID}
              name={card.name}
              description={card.description}
            />
						</div>
          </li>
        ))}
      </ul>
			<button onClick={props.closeModal}>Dejar De ver</button>
    </div>
    )

}

ModalCards.propTypes = {
    hand: PropTypes.array.isRequired,
		closeModal: PropTypes.func.isRequired 
}

export default ModalCards;

