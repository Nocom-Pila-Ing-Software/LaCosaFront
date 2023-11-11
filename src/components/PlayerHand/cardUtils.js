export const handleDiscardCard = async (actualTurn, clickedCardId, discardCard, gameId) => {
  const bodyContent = {
    "playerID": actualTurn,
    "cardID": clickedCardId
  }
  discardCard(gameId, bodyContent)
    .then((data) => {
      console.log("Respuesta de discardCard: ", data);
    })
    .catch((error) => {
      console.log(error);
    })

}


export const handleDrawCard = async (actualTurn, drawCard, gameId) => {
  const body = {
    "playerID": actualTurn
  }
  try {
    await drawCard(gameId, body)
  } catch (error) {
    console.error(error)
  }

}

export const handleOmitDefense = (targetPlayer, actualTurn, defendCard, gameId) => {
  if (targetPlayer) {
    let bodyContent = {
      "playerID": actualTurn,
      "cardID": -1
    }

    defendCard(gameId, bodyContent)
      .then((data) => {
        console.log("Respuesta de defendCard: ", data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const handleTradeCard = async (actualTurn, clickedCardId, tradeCard, gameId) => {
  const bodyContent = {
    "playerID": actualTurn,
    "cardID": clickedCardId
  }
  tradeCard(gameId, bodyContent)
    .then((data) => {
      console.log("Respuesta de discardCard: ", data);
    })
    .catch((error) => {
      console.log(error);
    })

}

export const handleDefendCard = (actualTurn, cardID, clickedCardId, getCardsDefend, defendCard, gameId) => {

  let bodyContent = {
    "playerID": actualTurn,
    "cardID": cardID
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
  defendCard(gameId, bodyContent)
    .then((data) => {
      console.log("Respuesta de defendCard: ", data);
    })
    .catch((error) => {
      console.log(error);
    })

}

export const handlePlayCard = async (actualTurn, selectedPlayer, clickedCardId, playCard, gameId) => {
  const bodyContent = {
    "playerID": actualTurn,
    "targetPlayerID": selectedPlayer,
    "cardID": clickedCardId
  }

  await playCard(gameId, bodyContent)
    .then((data) => {
      console.log("Respuesta de playCard: ", data);
    })
    .catch((error) => {
      console.error(error);
    })
}