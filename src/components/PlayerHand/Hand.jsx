import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from './Hand.module.css'
import HandClass from '../Table/Table.module.css'
import PropTypes from 'prop-types';
import Deck from "../UI/Deck";
import { drawCard, playCard, discardCard, tradeCard, defendCard, getPossibleTargets, getCardsDefend } from "../../services";

const Hand = (props) => {
  // Hand handling
  const [hand, setHand] = useState([])

  // Check my turn
  const [isTurn, setIsTurn] = useState(true)
  const [actualTurn, setActualTurn] = useState(1)

  // Interface effects
  const [hasDrawnCard, setHasDrawnCard] = useState(false);
  const [playersLiving, setPlayersLiving] = useState(0)

  // CardHandling
  const [clickedCardId, setClickedCardId] = useState(0)
  const [lastCardPlayed, setLastCardPlayed] = useState('')

  // Live effect
  const [isAlive, setIsAlive] = useState(true)
  const [selectedPlayer, setSelectedPlayer] = useState('nextPlayer')

  // Action to play
  const [currentAction, setCurrentAction] = useState('')
  const [targetPlayers, setTargetPlayers] = useState([])


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

      // Life cicle
      const usernamesDead = (props.allGameData.deadPlayers).map((player) => player.username)
      setIsAlive(!usernamesDead.includes(props.localPlayerInfo.playerFound.username));

      // Players living
      setPlayersLiving(props.allGameData.players.length)

      // Setting action
      const tempAction = props.allGameData.currentAction
      setCurrentAction(tempAction)

      const bodyContent = {
        "playerID": actualTurn,
        "cardID": clickedCardId
      }

      getPossibleTargets(bodyContent.playerID, bodyContent.cardID)
        .then((data) => {
          console.log("Respuesta de possibleTargets: ", data);
          setTargetPlayers(data.targets)
        })
        .catch((error) => {
          console.error(error);
        })

      console.log(selectedPlayer);
    }
  }, [props.localPlayerInfo, props.allGameData.playerPlayingTurn]);



  const handleCardClick = (cardId) => {
    setClickedCardId(cardId)

  }


  const handlePlayCard = () => {
    const bodyContent = {
      "playerID": actualTurn,
      "targetPlayerID": selectedPlayer,
      "cardID": clickedCardId
    }

    playCard(1, bodyContent)
      .then((data) => {
        console.log("Respuesta de playCard: ", data);
      })
      .catch((error) => {
        console.error(error);
      })

    setHasDrawnCard(false)
  }

  const handleDiscardCard = async () => {
    const bodyContent = {
      "playerID": actualTurn,
      "cardID": clickedCardId
    }
    discardCard("1", bodyContent)
      .then((data) => {
        console.log("Respuesta de discardCard: ", data);
      })
      .catch((error) => {
        console.log(error);
      })

    setHasDrawnCard(false)
  }

  const handleDrawCard = async () => {
    const body = {
      "playerID": actualTurn
    }
    try {
      await drawCard(1, body)
      setHasDrawnCard(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDefendCard = (targetPlayer) => {
    if (targetPlayer) {
      let bodyContent = {
        "playerID": actualTurn,
        "cardID": props.allGameData.lastPlayedCard.cardID
      }

      getCardsDefend(bodyContent.playerID, bodyContent.cardID)
        .then((data) => {
          console.log("Respuesta de getCardDefend: ", data);
          if (!data.cards) {
            console.log('hola');
          }
        })
        .catch((error) => {
          console.log(error);
        })

      bodyContent = {
        "playerID": actualTurn,
        "cardID": clickedCardId
      }

      defendCard(1, bodyContent)
        .then((data) => {
          console.log("Respuesta de defendCard: ", data);
        })
        .catch((error) => {
          console.log(error);
        })

    } else {
      alert('No hay mas jugadores')
    }
  }


  const handleOmitDefense = (targetPlayer) => {
    if (targetPlayer) {
      let bodyContent = {
        "playerID": actualTurn,
        "cardID": -1
      }

      defendCard(1, bodyContent)
        .then((data) => {
          console.log("Respuesta de defendCard: ", data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const handleTradeCard = async () => {
    const bodyContent = {
      "playerID": actualTurn,
      "cardID": clickedCardId
    }
    tradeCard("1", bodyContent)
      .then((data) => {
        console.log("Respuesta de discardCard: ", data);
      })
      .catch((error) => {
        console.log(error);
      })

    setHasDrawnCard(false)
  }

  return (
    <div className={HandClass.PLAYER}>
      <Deck />
      <p className={classes['last-played']}>{lastCardPlayed !== '' && `Se jugó ${lastCardPlayed}`}</p>

      <div className={classes.buttons}>

        {currentAction === 'action' && (
          <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
            disabled={!isTurn || !hasDrawnCard || (clickedCardId === 0)}
            onClick={handlePlayCard}>Jugar Carta</button>
        )}

        {currentAction === 'action' && (
          <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
            disabled={!isTurn}
            onClick={handleDiscardCard}>Descartar Carta</button>
        )}

        {currentAction === 'action' && (
          <select
            className={classes.select}
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            {targetPlayers.map((player) => (
              <option key={player.playerID} value={player.playerID}>
                {player.name}
              </option>
            ))}
          </select>
        )}


        {currentAction === 'draw' && (
          <button className={(isTurn && isAlive && !hasDrawnCard && (playersLiving > 1)) ? classes['enabled-button'] : classes['disabled-button']}
            disabled={!isTurn || !isAlive || hasDrawnCard || !(playersLiving > 1)}
            onClick={handleDrawCard}>Robar Carta</button>
        )}

        {currentAction === 'trade' && (
          <button className={(isTurn) ? classes['enabled-button'] : classes['disabled-button']}
            onClick={handleTradeCard}
          >Intercambiar carta</button>
        )}

        {currentAction === 'defense' && (
          <button className={(isTurn) ? classes['enabled-button'] : classes['disabled-button']}
            onClick={handleDefendCard}>Defensa</button>
        )}


        {currentAction === 'defense' && (
          <button className={(isTurn) ? classes['enabled-button'] : classes['disabled-button']}
            onClick={handleOmitDefense}>Omitir defensa</button>
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
              disabled={!isTurn}
              selectedCardID={clickedCardId}
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
