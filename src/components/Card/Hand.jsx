import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from './Hand.module.css'
import HandClass from '../Table/Table.module.css'
import PropTypes from 'prop-types';
import Deck from "../Table/Deck";
import { drawCard, playCard } from "../../services";

const Hand = (props) => {
  // Hand handling
  const [hand, setHand] = useState([])

  // Check my turn 
  const [isTurn, setIsTurn] = useState(true)
  const [actualTurn, setActualTurn] = useState(1)

  // Interface effects
  const [hasDrawnCard, setHasDrawnCard] = useState(false);
  const [actualTurnUsername, setActualTurnUsername] = useState('')

  // CardHandling
  const [clickedCardId, setClickedCardId] = useState(0)
  const [lastCardPlayed, setLastCardPlayed] = useState('')

  // Live effect
  const [isAlive, setIsAlive] = useState(true)


  useEffect(() => {
    console.log(props.localPlayerInfo);
    console.log(props.allGameData)

    console.log();
    if (props.localPlayerInfo) {
      // Hand state
      setHand(props.localPlayerInfo.playerInfo.hand);

      // Turns state
      const actualPlayerTurn = props.allGameData.players.find(((player) => player.playerID === actualTurn))
      const actualPlayerTurnUsername = actualTurn ? actualPlayerTurn.username : 'No se encontro el usuario'
      setActualTurnUsername(actualPlayerTurnUsername)
      setActualTurn(props.allGameData.playerPlayingTurn.playerID)

      // Validating my turn
      setIsTurn(actualTurn === props.localPlayerInfo.playerFound.playerID)

      // Last played card state
      setLastCardPlayed(props.allGameData.lastPlayedCard.name)

      // LIfe cicle
      setIsAlive(props.localPlayerInfo.playerFound.is_alive)
    }
  }, [props.localPlayerInfo, props.allGameData.playerPlayingTurn]);



  const handleCardClick = (cardId) => {
    setClickedCardId(cardId)
  }

  const handlePlayCard = () => {
    const currentPlayerIndex = props.allGameData.players.findIndex((player) => player.playerID === actualTurn)

    let nextPlayer = null;
    for (let i = 1; i < props.allGameData.players.length; i++) {
      const nextIndex = (currentPlayerIndex + i) % props.allGameData.players.length;
      const potentialNextPlayer = props.allGameData.players[nextIndex];

      if (potentialNextPlayer.is_alive) {
        nextPlayer = potentialNextPlayer;
        break;
      }
    }

    if (nextPlayer) {
      const bodyContent = {
        "playerID": actualTurn,
        "targetPlayerID": nextPlayer.playerID,
        "cardID": clickedCardId
      }


      playCard(1, bodyContent)
        .then((data) => {
          console.log("Respuesta de playCard: ", data);
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      alert('No hay mas jugadores')
    }

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


  return (
    <div className={HandClass.PLAYER}>
      <Deck />
      <p className={classes.turn}>Turno de <span>{actualTurnUsername}</span></p>
      <p className={classes['last-played']}><span>Monguito Monoaurelio</span> jugó {lastCardPlayed}</p>


      <div className={classes.buttons}>

        <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
          disabled={!isTurn || !hasDrawnCard}
          onClick={handlePlayCard}>Jugar Carta</button>

        <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
          disabled={!isTurn || !hasDrawnCard}>Descartar Carta</button>

        <button className={(isTurn && isAlive) ? classes['enabled-button'] : classes['disabled-button']}
          disabled={!isTurn || !isAlive}
          onClick={handleDrawCard}>Robar Carta</button>
      </div>
      {isAlive ? (
        <div className={classes['hand-container__hand']}>
          {hand.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              description={card.description}
              onCardClick={handleCardClick}
              disabled={!isTurn}
            />
          ))}
        </div>
      ) : (
        <p>Estas muerto!</p>
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