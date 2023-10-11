import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from './Hand.module.css'
import HandClass from '../Table/Table.module.css'
import PropTypes from 'prop-types';
import Deck from "../UI/Deck";
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
  const [playersLiving, setPlayersLiving] = useState(0)

  // CardHandling
  const [clickedCardId, setClickedCardId] = useState(0)
  const [lastCardPlayed, setLastCardPlayed] = useState('')

  // Live effect
  const [isAlive, setIsAlive] = useState(true)


  useEffect(() => {
    console.log(props.localPlayerInfo);
    console.log(props.allGameData)
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

      // Life cicle
      const usernamesDead = (props.allGameData.deadPlayers).map((player) => player.username)
      setIsAlive(!usernamesDead.includes(props.localPlayerInfo.playerFound.username));

      // Players living
      setPlayersLiving(props.allGameData.players.length)

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

    let leftPlayer = null;
    for (let i = 1; i < props.allGameData.players.length; i++) {
      const leftIndex = (currentPlayerIndex - i + props.allGameData.players.length) % props.allGameData.players.length;
      const potentialLeftPlayer = props.allGameData.players[leftIndex];

      if (potentialLeftPlayer.is_alive) {
        leftPlayer = potentialLeftPlayer;
        break;
      }
    }


    console.log(nextPlayer);
    console.log(leftPlayer);

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
      <p className={classes['last-played']}>{lastCardPlayed !== '' && `Se jugó ${lastCardPlayed}`}</p>

      <div className={classes.buttons}>

        <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
          disabled={!isTurn || !hasDrawnCard || (clickedCardId === 0)}
          onClick={handlePlayCard}>Jugar Carta</button>

        <button className={(isTurn && hasDrawnCard) ? classes['enabled-button'] : classes['disabled-button']}
          disabled={!isTurn || !hasDrawnCard}>Descartar Carta</button>

        <button className={(isTurn && isAlive && !hasDrawnCard && (playersLiving > 1)) ? classes['enabled-button'] : classes['disabled-button']}
          disabled={!isTurn || !isAlive || hasDrawnCard || !(playersLiving > 1)}
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