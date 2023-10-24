import OtherPlayerHand from "../OtherPlayersHands/OtherPlayerHand";
import Hand from "../PlayerHand/Hand";
import classes from './Table.module.css'
import sitConfigs from "../../utils/sitConfigs"
import React from 'react'
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getGameInfo, getPlayerInfo } from "../../services";

const Table = (props) => {
  let actualTable = sitConfigs[props.nOfPlayers];

  const [playersInfo, setPlayersInfo] = useState([])
  const [localPlayerInfo, setLocalPlayerInfo] = useState('')
  const [allGameData, setAllGameData] = useState('')
  const [allDeadPlayers, setAllDeadPlayers] = useState([])
  const [gameEnded, setGameEnded] = useState(false)

  useEffect(() => {
    let localPlayer = props.localName;

    const fetchData = async () => {
      try {
        console.log(props.gameID)
        const gameStartedInfo = await getGameInfo(props.gameID);

        // Game data
        const players = (gameStartedInfo.players).concat(gameStartedInfo.deadPlayers);
        setPlayersInfo(players);
        setAllGameData(gameStartedInfo);

        // Info of current player
        const playerFound = players.find((player) => player.username === localPlayer);
        const playerInfo = await getPlayerInfo(playerFound.playerID);

        // Deaths
        setAllDeadPlayers(gameStartedInfo.deadPlayers)

        setLocalPlayerInfo({ playerFound, playerInfo });
        setGameEnded(gameStartedInfo.result.isGameOver);

      } catch (error) {
        console.error(error);
        setGameEnded(true);
      }
    };

    fetchData();

    const pollingIntervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(pollingIntervalId);
    };
  }, [props.localName]);


  const arrayOfNames = playersInfo.map((user) => user.username);
  const indexOfLocalName = playersInfo.findIndex((user) => user.username === props.localName);
  const firstHalf = arrayOfNames.slice(indexOfLocalName + 1)
  const secondHalf = arrayOfNames.slice(0, indexOfLocalName)
  const sorted = firstHalf.concat(secondHalf);

  const nameOfDeaths = allDeadPlayers.map((user) => user.username)

  const handleGameEnd = (e) => {
    e.preventDefault();
    props.onGameEnd();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className={classes['table-container']}>
      <Hand
        name={props.localName}
        localPlayerInfo={localPlayerInfo}
        allGameData={allGameData}
      />

      {actualTable.map((player, index) => {

        const playerName = sorted[index]

        return (
          <div key={index}
            className={classes[player]}>
            <OtherPlayerHand

              name={nameOfDeaths.includes(playerName) ? 'MUERTO' : playerName} />
          </div>
        )
      })}
      {gameEnded && (
        <div className={classes['overlay']}>
          <form action="" onSubmit={handleSubmit}>
            <h2>El juego ha terminado.....</h2>
            {allGameData.result.humansWin ? (
              <div>
              <h3>¡GANAN LOS HUMANOS!</h3>
              <ul>
                {allGameData.result.winners.map((winner, index) => (
                  <li key={index}>{winner.username}</li>
                ))}
              </ul>
              <button onClick={handleGameEnd}>Salir</button>
              </div>
            ):(
              <div>
                <h3>¡GANO LA COSA!</h3>
                <ul>
                  {allGameData.result.winners.map((winner) => (
                    <li key={winner.playerID}>
                      <div>
                        <span> {winner.username} </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={handleGameEnd}>Salir</button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>

  );
};

Table.propTypes = {
  nOfPlayers: PropTypes.number.isRequired,
  localName: PropTypes.string.isRequired,
  gameID: PropTypes.number.isRequired,
  onGameEnd: PropTypes.func.isRequired,
}

export default Table;
