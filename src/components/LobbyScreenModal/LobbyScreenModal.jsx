import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../services.js';
import classes from '../styles/form-style.module.css'

const LobbyScreenModal = (props) => {
  const [players, setPlayers] = useState([]);
  const [localName, setLocalName] = useState('');
  const [hostName, setHostName] = useState('');
  const [hostID, setHostID] = useState(-1);

  // useEffect(() => {

  //   const fetchData = async () => {
  //     try {
  //       const roomInfo = await api.getRoomInfo(props.roomID);
  //       console.log(roomInfo);

  //       setHostName(roomInfo.host.name);
  //       console.log(hostName);

  //       setHostID(roomInfo.host.id);
  //       console.log(hostID);

  //       setPlayers(roomInfo.Players);
  //       console.log(players);

  //       setLocalName(props.localName);
  //       console.log(localName);

  //       if (roomInfo.hasStarted){
  //         props.onStartGame(localName);
  //       }
        
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();

  //   const pollingIntervalId = setInterval(fetchData, 3000);
  //   return () => {
  //     clearInterval(pollingIntervalId);
  //   };

  // }, [localName]);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const pollRoom = () => {
    api.getRoomInfo(props.roomID)
      .then((data) => {
        console.log(props.roomID);
        setHostName(data.host.name);
        console.log(hostName);
        setHostID(data.host.id);
        setPlayers(data.Players);
        setLocalName(props.localName);
        if (data.hasStarted) {
          props.onStartGame(localName);
        } else {
          setTimeout(pollRoom, 3000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    pollRoom();
  }, [props.localName]);

  const handleLeave = () => {
    try{
      api.removePlayerFromRoom(props.roomID, { 'playerID': hostID});

    }catch(error){
      console.error(error);
    }
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    api.createGame({ 'roomID': props.roomID })
  };

  const isHost = localName === hostName;

  return (
    <div className={classes['blur-background']}>
      <form action="" className={classes['form-container']} onSubmit={handleSubmit}>
        <h2>Sala de Espera</h2>
        <h3>{`ID de la Sala: ${props.roomID}`}</h3>
        <ul className={classes['players-list-item-container']}>
          {players.map((player, index) => (
            <li className={classes['players-list-item']} key={index}>
              {player.playerName}
              </li>
          ))}
        </ul>
        {isHost ? (
          <button onClick={handleStartGame}> Iniciar partida</button>
        ):(
          <p className={classes['loading-text']}>Esperando al anfitrión</p>
        )}
        <button onClick={() => { handleLeave(); props.onLeave(); }}>Abandonar Sala</button>
      </form>
    </div>
  );

}

LobbyScreenModal.propTypes = {
  roomID: PropTypes.string.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  localName: PropTypes.string.isRequired,
};

export default LobbyScreenModal;