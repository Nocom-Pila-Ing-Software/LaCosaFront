import React from 'react'
import PropTypes from 'prop-types';
import cardClasses from './Card.module.css'

const ShownHand = (props) => {
    return (
        <div>{
            props.shownCards.map((card, index) => {
                const cardName = 'card-' + card.name.replace(/\s+/g, '-');
                console.log(cardName)
                return (
                    <div
                        index={index}
                        className={`${cardClasses[cardName]} ${cardClasses.background_img} ${cardClasses.card}`}
                    >
                    </div>
                )
            })
        }</div>
    )
}

ShownHand.propTypes = {
    shownCards: PropTypes.array.isRequired,
}

export default ShownHand;
