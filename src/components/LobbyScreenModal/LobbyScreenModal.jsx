import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../../services.js';
import classes from '../styles/form-style.module.css'

const LobbyScreenModal = (props) => {
  const [players, setPlayers] = useState([]);
  const [localName, setLocalName] = useState('');
  const [hostName, setHostName] = useState('');
  const [hostID, setHostID] = useState(-1);
  const [gameID, setGameID] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const pollRoom = () => {
    api.getRoomInfo(props.roomID)
      .then((data) => {

        console.log(props.roomID);

        setHostName(data.host.name);

        setHostID(data.host.id);
        console.log(data.host.id);

        setPlayers(data.Players);
        console.log(data.Players);

        setLocalName(props.localName);

        if (!data.hasStarted) {
          setTimeout(pollRoom, 3000); 
        }else{
          props.onStartGame(props.roomID, gameID);
        }
      })
      .catch((error) => {
        console.error(error);
        props.onLeave();
      });
  };

  useEffect(() => {
    pollRoom();
  }, [props.localName]);

  const handleStartGame = (e) => {
    e.preventDefault();
    api.createGame({"roomID": props.roomID})
    .then((data) => {
      console.log(data.gameID);
      const aux = data.gameID;
      setGameID(aux);
      console.log(aux)
      
    }).catch((error) => {
      console.log(error);
    })
  };

  const handleLeave = (id) => {
    try{
      api.removePlayerFromRoom(props.roomID, {"playerID": id})
    }catch(error){
      console.error(error);
    }
  };

  const isHost = localName === hostName;
  const isHostID = hostID === props.idPlayer;

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
        {isHostID ? (
          <button onClick={() => {handleLeave(hostID);}}>Abandonar Sala</button>
        ) : (
          <button onClick={() => {handleLeave(props.idPlayer); props.onLeave();}}>Abandonar Sala</button>
        )}
      </form>
    </div>
  );

}

LobbyScreenModal.propTypes = {
  roomID: PropTypes.number.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  localName: PropTypes.string.isRequired,
  idPlayer: PropTypes.number.isRequired,
};

export default LobbyScreenModal;
