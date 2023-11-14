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

  // CardHandling
  const [clickedCardId, setClickedCardId] = useState(0)
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

  // Role
  const [role, setRole] = useState('')


  useEffect(() => {
    console.log(props.localPlayerInfo);
    console.log(props.allGameData)
    if (props.localPlayerInfo) {
      // Hand state
      setHand(props.localPlayerInfo.playerInfo.hand);
      setActualTurn(props.allGameData.playerPlayingTurn.playerID)

      // Validating my turn
      setIsTurn(props.allGameData.playerPlayingTurn.playerID === props.localPlayerInfo.playerFound.playerID)

      // Last played card state
      setLastCardPlayedID(props.allGameData.lastPlayedCard.cardID)

      // Life cicle
      const usernamesDead = (props.allGameData.deadPlayers).map((player) => player.username)
      setIsAlive(!usernamesDead.includes(props.localPlayerInfo.playerFound.username));

      // Setting action
      const tempAction = props.allGameData.currentAction
      setCurrentAction(tempAction)

      let rolePlayer = props.localPlayerInfo.playerInfo.role
      console.log(rolePlayer);
      if (rolePlayer === 'thing') {
        setRole("La Cosa")
      } else if (rolePlayer === 'human') {
        setRole("Humano")
      } else if (rolePlayer === 'infected') {
        setRole("Infectado")
      }

      const bodyContent = {
        "playerID": actualTurn,
        "cardID": clickedCardId
      }

      /* CURRENT ACTION: ACTION */
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
            setCardsToPlay(data.cards)
          })
          .catch((error) => {
            console.error(error);
          })

        const possibleCardToPlay = cardsToPlay.find(card => card.cardID === clickedCardId)
        if (possibleCardToPlay) {
          const cardPlayability = possibleCardToPlay.playable
          setCanPlayCard(cardPlayability)
          console.log(canPlayCard);
        }
      }

      /* CURRENT ACTION: TRADE */
      if (currentAction === 'trade') {
        getCardsToTrade(actualTurn)
          .then((data) => {
            console.log("Respuesta de cardsToTrade: ", data);
            setCardsToTrade(data.cards)
            console.log(canTrade);
            const possibleCardToTrade = cardsToTrade.find(card => card.cardID === clickedCardId)
            if (possibleCardToTrade) {
              const cardTradeability = possibleCardToTrade.usable
              setCanTrade(cardTradeability)
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
      /* CURRENT ACTION: DEFENSE */
      if (currentAction === 'defense') {
        getCardsDefend(bodyContent.playerID, lastCardPlayedID)
          .then((data) => {
            console.log("Respuesta de getCardsDefend: ", data);
            setCardsToDefend(data.cards)
            console.log(cardsToDefend);

            const possibleCardToDefend = cardsToDefend.find(card => card.cardID === clickedCardId)
            if (possibleCardToDefend) {
              const isDefensible = possibleCardToDefend.usable
              setCanDefend(isDefensible)
              console.log(canDefend);
            }
          })
          .catch((error) => {
            console.error(error);
          })
      }
    }

    const pollingIntervalId = setInterval(useEffect, 2000);
    return () => {
      clearInterval(pollingIntervalId);
    };
  }, [props.localPlayerInfo, props.allGameData]);

  const handleCardClick = (cardId) => {
    setClickedCardId(cardId)
    if (currentAction === 'action') {
      setSelectedPlayer(targetPlayers[0].playerID)
    }
    console.log(selectedPlayer);
  }

  return (
    <div className={HandClass.PLAYER}>
      <Deck />
      {
        !isTurn && (
          <p className={classes['last-played']}>Espera a que sea tu turno para poder jugar</p>
        )
      }
      <div className={classes.buttons}>
        {currentAction === 'action' && isTurn && canPlayCard && (
          <button className={classes['enabled-button']}
            onClick={() => handlePlayCard(actualTurn, selectedPlayer, clickedCardId, playCard, props.allGameData.gameID)}>Jugar Carta</button>
        )}

        {currentAction === 'action' && isTurn && (
          <button className={classes['enabled-button']}
            disabled={!isTurn}
            onClick={() => handleDiscardCard(actualTurn, clickedCardId, discardCard, props.allGameData.gameID)}>Descartar Carta</button>
        )}

        {currentAction === 'action' && isTurn && canPlayCard && (
          <select
            className={classes.select}
            value={selectedPlayer}
            onChangeCapture={
              (e) => {
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
          <button className={classes['enabled-button']}
            onClick={() => handleDrawCard(actualTurn, drawCard, props.allGameData.gameID)}>Robar Carta</button>
        )}

        {currentAction === 'trade' && isTurn && (
          <button className={classes['enabled-button']}
            onClick={() => handleTradeCard(actualTurn, clickedCardId, tradeCard, props.allGameData.gameID)}
          >Intercambiar carta</button>
        )}

        {currentAction === 'defense' && isTurn && canDefend && (
          <button className={classes['enabled-button']}
            onClick={() => handleDefendCard(actualTurn, lastCardPlayedID, clickedCardId, getCardsDefend, defendCard, props.allGameData.gameID)}>Defensa</button>
        )}

        {currentAction === 'defense' && isTurn && (
          <button className={classes['enabled-button']}
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
              disabled={!isTurn}
              selectedCardID={clickedCardId}
              cardsToPlay={cardsToPlay}
              cardsToTrade={cardsToTrade}
              cardsToDefend={cardsToDefend}
            />
          ))}
        </div>
      ) : (
        <p className={classes['death-text']}>Estas muerto!</p>
      )}

      <p>{props.name} eres {role}</p>
    </div >

  )
}

Hand.propTypes = {
  name: PropTypes.string.isRequired,
  localPlayerInfo: PropTypes.object.isRequired,
  allGameData: PropTypes.object.isRequired,

}

export default Hand;
