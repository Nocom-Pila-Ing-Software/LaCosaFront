import { Fragment } from "react";
import ExternalHand from "../OtherPlayersHands/ExternalHand";
import Hand from '../Card/Hand'
import classes from './Table.module.css'
import sitConfigs from "../../utils/sitConfigs";

const Table = ({ nOfPlayers }) => {
  const actualTable = sitConfigs[nOfPlayers];

  return (
    <div className={classes['table-container']}>
      <Hand name="Tu mano" />

      {actualTable.map((player, index) => {

        return (
          <div key={index} className={classes[player]}><ExternalHand name="Jugador " /> </div>
        )
      })}
    </div>

  );
};

export default Table;

