import React, { useState, useEffect} from 'react'
import * as api from '../../services.js';
import PropTypes from 'prop-types';


const Modal = (props) => {

  const [listRooms, setListRooms] = useState([]);

  useEffect(() => {
    const ObtenerPartidas = async () => {
      try{ 
			  const games = await api.getWaitingRooms()
			  setListRooms(games.rooms);
      } catch (error) {
        console.log(error);
        setListRooms([]);
      }  
		};

    ObtenerPartidas();

		const pollingIntervalId = setInterval(ObtenerPartidas, 3000);
    return () => {
      clearInterval(pollingIntervalId);
    };
	}, []);

  const JoinGame = async (roomID) => {
    const body = {'playerName': props.playerName};
    await api.addPlayerToWaitingRoom(roomID, body)
    .then((data) => {
      props.onRoomCreated(roomID, props.playerName, data.playerID);
    })
    .catch((error) => {
      if(error.response && error.response.status === 404){
        console.log("La sala no existe");
        alert('La sala no existe, introduce una ID de sala existente.');
      } else if(error.response && error.response.status === 400){
        if(error.response.data && error.response.data.detail === "Game has already started"){
          console.log("El juego ya ha comenzado, no puedes unirte.");
          alert('El juego ya ha comenzado, no puedes unirte.');
        }else{
        console.log("El nombre de jugador introducido ya existe, por favor ingrese otro.");
        alert('El nombre de jugador introducido ya existe, por favor ingrese otro.');
        }
      }})
  }

  const CanJoin = async (roomID, maxPlayers, playerAmount) => {
    const data = await api.getRoomInfo(roomID);
    if (!data.hasStarted && maxPlayers > playerAmount) {
      console.log(data.hasStarted);
      return true;
    }else if (data.hasStarted){
      return false;
    }
  }
  return(
    <div>
			<h2>Lista de partidas</h2>
			<ul>
				{listRooms.map((room) => (
					<li key={room.id}>
            <div>
						<span>{room.name}</span>
            </div>
						<span>
						Jugadores : {room.playerAmount} / {room.maxPlayers}
						</span>
						{(CanJoin(room.id, room.maxPlayers, room.playerAmount)) && (
              <button onClick={() => JoinGame(room.id)}>Unirse</button>
            )}
            <div>{room.playerAmount === room.maxPlayers && <span>La sala esta llena</span>}</div>
            <div>{!(CanJoin(room.id, room.maxPlayers, room.playerAmount)) && <span>La sala esta en juego</span>}</div>
					</li>
				))}
			</ul>
      <button onClick={props.closeModal}>Cerrar lista</button>
		</div>
  )
}

Modal.propTypes = {
  playerName: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onRoomCreated: PropTypes.func.isRequired,
}

export default Modal;
