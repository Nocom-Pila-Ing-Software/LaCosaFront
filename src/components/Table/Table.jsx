import OtherPlayerHand from "../OtherPlayersHands/OtherPlayerHand";
import Hand from '../Card/Hand'
import classes from './Table.module.css'
import sitConfigs from "../../utils/sitConfigs"
import React from 'react'
import PropTypes from 'prop-types';


const Table = (props) => {
  const actualTable = sitConfigs[props.nOfPlayers];

  return (
    <div className={classes['table-container']}>
      <Hand name="Tu mano" />
      {actualTable.map((player, index) => {
        return (
          <div key={index} className={classes[player]}><OtherPlayerHand name={index} /> </div>
        )
      })}
    </div>

  );
};

Table.propTypes = {
  nOfPlayers: PropTypes.number.isRequired
}

export default Table;