import React from 'react'
import PropTypes from 'prop-types';
import cardClasses from './Card.module.css'
import classes from './ShownHand.module.css'

const ShownHand = (props) => {
    return (
        <div className={classes['over']}>
            <h1>MIREN LAS CARTAS</h1>
            <div className={classes['card-row']}>
                {
                props.shownCards.map((card) => {
                const cardName = 'card-' + card.name.replace(/\s+/g, '-');
                console.log(cardName)
                return (
                    <div
                        key={card.cardID}
                        className={`${cardClasses[cardName]} ${cardClasses.background_img} ${cardClasses.card}`}
                    >
                    </div>
                )
                })
                }
            </div>
            <button onClick={props.closeModal}>Creo que vi suficiente...</button>
        </div>
    )
}

ShownHand.propTypes = {
    shownCards: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default ShownHand;
