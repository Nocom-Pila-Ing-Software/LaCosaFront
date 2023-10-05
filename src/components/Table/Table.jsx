import OtherPlayerHand from "../OtherPlayersHands/OtherPlayerHand";
import Hand from '../Card/Hand'
import classes from './Table.module.css'
import sitConfigs from "../../utils/sitConfigs"
import React from 'react'
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getGameInfo, getPlayerInfo } from "../../services";

const Table = (props) => {
  const actualTable = sitConfigs[props.nOfPlayers];
  const [gameInfo, setGameInfo] = useState([])
  const [handsInfo, setHandsInfo] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const gameStartedInfo = await getGameInfo(1)
        setGameInfo(gameStartedInfo.players);
        console.log(gameInfo)

        let i = 0;
        while (i < gameInfo.length) {
          let currentPlayer = "Player " + i

          console.log({ [currentPlayer]: await getPlayerInfo(gameInfo[i].playerID) })
          i = i + 1
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()


  }, [])



  const arrayOfNames = gameInfo.map((user) => user.username);
  const indexOfLocalName = arrayOfNames.indexOf(props.localName)

  const firstHalf = arrayOfNames.slice(indexOfLocalName + 1)
  const secondHalf = arrayOfNames.slice(0, indexOfLocalName)

  const sorted = firstHalf.concat(secondHalf);


  return (
    <div className={classes['table-container']}>
      <Hand name={props.localName} />
      {actualTable.map((player, index) => {
        return (
          <div key={index} className={classes[player]}>
            <OtherPlayerHand name={sorted[index]} /> </div>
        )
      })}
    </div>

  );
};

Table.propTypes = {
  nOfPlayers: PropTypes.number.isRequired
}

export default Table;