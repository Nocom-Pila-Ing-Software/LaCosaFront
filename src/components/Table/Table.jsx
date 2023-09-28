import OtherPlayerHand from "../OtherPlayersHands/OtherPlayerHand";
import Hand from '../Card/Hand'
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


  useEffect(() => {
    let localPlayer = props.localName;

    const fetchData = async () => {
      try {
        const gameStartedInfo = await getGameInfo(1);

        // Game data
        const players = gameStartedInfo.players;
        setPlayersInfo(players);
        setAllGameData(gameStartedInfo);

        // Info of current player
        const playerFound = players.find((player) => player.username === localPlayer);
        const playerInfo = await getPlayerInfo(playerFound.playerID);
        setLocalPlayerInfo({ playerFound, playerInfo });


      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const pollingIntervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(pollingIntervalId);
    };
  }, [props.localName]);


  const arrayOfNames = playersInfo.map((user) => user.username);
  const indexOfLocalName = arrayOfNames.indexOf(props.localName)
  const firstHalf = arrayOfNames.slice(indexOfLocalName + 1)
  const secondHalf = arrayOfNames.slice(0, indexOfLocalName)
  const sorted = firstHalf.concat(secondHalf);


  return (
    <div className={classes['table-container']}>
      <Hand
        name={props.localName}
        localPlayerInfo={localPlayerInfo}
        allGameData={allGameData}
      />

      {actualTable.map((player, index) => {
        return (
          <div key={index}
            className={classes[player]}>
            <OtherPlayerHand
              name={sorted[index] !== undefined ? sorted[index] : 'MUERTO'} />
          </div>
        )
      })}
      <div className={classes['center-button']}>
        <button>Robar carta</button>
      </div>
    </div>

  );
};

Table.propTypes = {
  nOfPlayers: PropTypes.number.isRequired,
  localName: PropTypes.string.isRequired,
}

export default Table;