import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../services.js';
import classes from '../styles/form-style.module.css'

const LobbyScreenModal = (props) => {
  const [players, setPlayers] = useState([]);
  const [canStartGame, setCanStartGame] = useState(false);
  const [localName, setLocalName] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const roomInfo = await api.getRoomInfo(props.roomID);

        console.log(roomInfo);

        setPlayers(roomInfo.Players);
        console.log(roomInfo.Players);

        console.log(players);
        setCanStartGame(true);

        setLocalName(props.localName);

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

  const handleStartGame = (e) => {
    e.preventDefault();
    api.createGame({ 'roomID': props.roomID })
    props.onStartGame(localName);
  };

  return (
    <div className={classes['blur-background']}>
      <form action="" className={classes['form-container']} onSubmit={(e) => e.preventDefault()}>
        <h2>Sala de Espera</h2>
        <ul className={classes['players-list-item-container']}>
          {players.map((player, index) => (
            <li className={classes['players-list-item']} key={index}>
              {player.playerName}
              </li>
          ))}
        </ul>
        {canStartGame && <button onClick={handleStartGame}>Iniciar partida</button>}
        <button onClick={props.onLeave}>Salir</button>
      </form>
    </div>
  );

}

LobbyScreenModal.propTypes = {
  roomID: PropTypes.number.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  localName: PropTypes.string.isRequired,
};

export default LobbyScreenModal;