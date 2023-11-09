import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from './Hand.module.css'
import HandClass from '../Table/Table.module.css'
import PropTypes from 'prop-types';
import Deck from "../UI/Deck";
import { drawCard, playCard, discardCard, tradeCard, defendCard, getPossibleTargets, getCardsDefend, getCardsUsability, getCardsToTrade } from "../../services";
import { handleDefendCard, handleDiscardCard, handleDrawCard, handleOmitDefense, handlePlayCard, handleTradeCard } from "./cardUtils";

const Hand = (props) => {
  // Hand handling
  const [hand, setHand] = useState([])

  // Check my turn
  const [isTurn, setIsTurn] = useState(true)
  const [actualTurn, setActualTurn] = useState(1)

  // Interface effects
  const [hasDrawnCard, setHasDrawnCard] = useState(false);

  // CardHandling
  const [clickedCardId, setClickedCardId] = useState(0)
  const [lastCardPlayed, setLastCardPlayed] = useState('')
  const [lastCardPlayedID, setLastCardPlayedID] = useState(0)

  // Live effect
  const [isAlive, setIsAlive] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState(-1)

  // Action to play
  const [currentAction, setCurrentAction] = useState('')
  const [targetPlayers, setTargetPlayers] = useState([])

  // Play cards behavior
  const [cardsToPlay, setCardsToPlay] = useState([])
  const [canPlayCard, setCanPlayCard] = useState(false)

  // Trade cards behavior
  const [cardsToTrade, setCardsToTrade] = useState([])
  const [canTrade, setCanTrade] = useState(false)

  // Defend behavior
  const [cardsToDefend, setCardsToDefend] = useState([])
  const [canDefend, setCanDefend] = useState(false)


  useEffect(() => {
    console.log(props.localPlayerInfo);
    console.log(props.allGameData)
    if (props.localPlayerInfo) {
      // Hand state
      setHand(props.localPlayerInfo.playerInfo.hand);

      // Turns state
      const actualPlayerTurn = props.allGameData.players.find(((player) => player.playerID === actualTurn))
      console.log(actualPlayerTurn);

      setActualTurn(props.allGameData.playerPlayingTurn.playerID)

      // Validating my turn
      setIsTurn(actualTurn === props.localPlayerInfo.playerFound.playerID)

      // Last played card state
      setLastCardPlayed(props.allGameData.lastPlayedCard.name)
      setLastCardPlayedID(props.allGameData.lastPlayedCard.cardID)

      // Life cicle
      const usernamesDead = (props.allGameData.deadPlayers).map((player) => player.username)
      setIsAlive(!usernamesDead.includes(props.localPlayerInfo.playerFound.username));

      // Setting action
      const tempAction = props.allGameData.currentAction
      setCurrentAction(tempAction)

      const bodyContent = {
        "playerID": actualTurn,
        "cardID": clickedCardId
      }
      console.log(currentAction);
      if (currentAction === 'action') {
        getPossibleTargets(bodyContent.playerID, bodyContent.cardID)
          .then((data) => {
            console.log("Respuesta de possibleTargets: ", data);
            setTargetPlayers(data.targets)
          })
          .catch((error) => {
            console.error(error);
          })

        getCardsUsability(actualTurn)
          .then((data) => {
            console.log("Respuesta de getCardsUsability: ", data);
            console.log(data.cards);
            setCardsToPlay(data.cards)
          })
          .catch((error) => {
            console.error(error);
          })

      } else if (currentAction === 'trade') {
        getCardsToTrade(actualTurn)
          .then((data) => {
            console.log("Respuesta de cardsToTrade: ", data);
            setCardsToTrade(data.cards)
          })
          .catch((error) => {
            console.error(error);
          })

      } else if (currentAction === 'defense') {
        getCardsDefend(bodyContent.playerID, bodyContent.cardID)
          .then((data) => {
            console.log("Respuesta de getCardsDefend: ", data);
            setCardsToDefend(data.cards)
            console.log(cardsToDefend);
          })
          .catch((error) => {
            console.error(error);
          })
      }

      const clickedCard = cardsToPlay.find(card => card.cardID === clickedCardId)

      const tradeableCard = cardsToTrade.find(card => card.cardID === clickedCardId)
      const defenseCard = cardsToDefend.find(card => card.cardID === clickedCardId)

      console.log(defenseCard);
      if (currentAction === 'action' && clickedCard) {
        const isPlayable = clickedCard.playable
        setCanPlayCard(isPlayable)

      } else if (currentAction === 'trade' && tradeableCard) {
        const isTradeable = tradeableCard.usable
        setCanTrade(isTradeable)
      } else if (currentAction === 'defense' && defenseCard) {
        const isDefensible = defenseCard.usable
        setCanDefend(isDefensible)
      }
    }

    const pollingIntervalId = setInterval(useEffect, 4000);
    return () => {
      clearInterval(pollingIntervalId);
    };
  }, [props.localPlayerInfo, props.allGameData.playerPlayingTurn]);


  const handleCardClick = (cardId) => {
    setClickedCardId(cardId)
    setSelectedPlayer(targetPlayers[0].playerID)
  }


  return (
    <div className={HandClass.PLAYER}>
      <p className={classes['last-played']}>{lastCardPlayed !== '' && `Se jugó ${lastCardPlayed}`}</p>
      <Deck />

      <div className={classes.buttons}>

        {currentAction === 'action' && isTurn && canPlayCard && (
          <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
            disabled={!isTurn || !hasDrawnCard || (clickedCardId === 0)}
            onClick={() => handlePlayCard(actualTurn, selectedPlayer, clickedCardId, playCard, props.allGameData.gameID)}>Jugar Carta</button>
        )}

        {currentAction === 'action' && isTurn && (
          <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
            disabled={!isTurn}
            onClick={() => handleDiscardCard(actualTurn, clickedCardId, discardCard, props.allGameData.gameID)}>Descartar Carta</button>
        )}

        {currentAction === 'action' && isTurn && canPlayCard && (
          <select
            className={classes.select}
            value={selectedPlayer}
            onChangeCapture={(e) => {
              console.log("Selected player: ", e.target.value);
              setSelectedPlayer(e.target.value)
            }
            }
          >
            {targetPlayers.map((player) => (
              <option key={player.playerID} value={player.playerID}>
                {player.name}
              </option>
            ))}
          </select>
        )}


        {currentAction === 'draw' && isTurn && (
          <button className={(isTurn && isAlive && !hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
            disabled={!isTurn || !isAlive || hasDrawnCard}
            onClick={() => handleDrawCard(actualTurn, drawCard, setHasDrawnCard, props.allGameData.gameID)}>Robar Carta</button>
        )}

        {currentAction === 'trade' && isTurn && (
          <button className={(isTurn) ? classes['enabled-button'] : classes['disabled-button']}
            onClick={() => handleTradeCard(actualTurn, clickedCardId, tradeCard, props.allGameData.gameID)}
          >Intercambiar carta</button>
        )}

        {currentAction === 'defense' && isTurn && canDefend && (
          <button className={(isTurn) ? classes['enabled-button'] : classes['disabled-button']}
            onClick={() => handleDefendCard(actualTurn, lastCardPlayedID, clickedCardId, getCardsDefend, defendCard, props.allGameData.gameID)}>Defensa</button>
        )}


        {currentAction === 'defense' && isTurn && (
          <button className={(isTurn) ? classes['enabled-button'] : classes['disabled-button']}
            onClick={() => handleOmitDefense(selectedPlayer, actualTurn, defendCard, props.allGameData.gameID)}>Omitir defensa</button>
        )}

      </div>
      {isAlive ? (
        <div className={classes['hand-container__hand']}>
          {hand.map((card) => (
            <Card
              key={card.cardID}
              id={card.cardID}
              name={card.name}
              description={card.description}
              onCardClick={handleCardClick}
              disabled={!isTurn && !canPlayCard}
              selectedCardID={clickedCardId}
              cardsToPlay={cardsToPlay}
              cardsToTrade={cardsToTrade}
              cardsToDefend={cardsToDefend}
              currentAction={currentAction}
            />
          ))}
        </div>
      ) : (
        <p className={classes['death-text']}>Estas muerto!</p>
      )}

      <p>{props.name}</p>
    </div >

  )
}

Hand.propTypes = {
  name: PropTypes.string.isRequired,
  localPlayerInfo: PropTypes.object.isRequired,
  allGameData: PropTypes.object.isRequired,

}

export default Hand;
