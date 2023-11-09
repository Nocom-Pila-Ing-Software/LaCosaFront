export const handleDiscardCard = async (actualTurn, clickedCardId, discardCard) => {
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

}


export const handleDrawCard = async (actualTurn, drawCard) => {
  const body = {
    "playerID": actualTurn
  }
  try {
    await drawCard(1, body)
  } catch (error) {
    console.error(error)
  }

}

export const handleOmitDefense = (targetPlayer, actualTurn, defendCard) => {
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

export const handleTradeCard = async (actualTurn, clickedCardId, tradeCard) => {
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

}

export const handleDefendCard = (actualTurn, cardID, clickedCardId, getCardsDefend, defendCard) => {

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
  defendCard(1, bodyContent)
    .then((data) => {
      console.log("Respuesta de defendCard: ", data);
    })
    .catch((error) => {
      console.log(error);
    })

}

export const handlePlayCard = async (actualTurn, selectedPlayer, clickedCardId, playCard) => {
  const bodyContent = {
    "playerID": actualTurn,
    "targetPlayerID": selectedPlayer,
    "cardID": clickedCardId
  }

  await playCard(1, bodyContent)
    .then((data) => {
      console.log("Respuesta de playCard: ", data);
    })
    .catch((error) => {
      console.error(error);
    })
}