import React, { useState, useEffect} from 'react'
import * as api from '../../services.js';
import PropTypes from 'prop-types';


const Modal = (props) => {

  const [listRooms, setListRooms] = useState([]);

  useEffect(() => {
    const ObtenerPartidas = async () => {
			await api.getWaitingRooms()
				.then((data) => {
					setListRooms(data.rooms);
				})
				.catch((error) => {
					console.log(error);
					setListRooms([]);
				})
		}

		ObtenerPartidas();

		const pollingIntervalId = setInterval(ObtenerPartidas, 3000);
    return () => {
      clearInterval(pollingIntervalId);
    };
	}, [listRooms]);

  const JoinGame = async (roomID) => {
    const body = {'playerName': props.playerName};
    await api.addPlayerToWaitingRoom(roomID, body)
    .then((response) => {
      if (response && response.ok) {
        console.log(response);
      }

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

  const CanJoin = async (roomID, max_players, player_amount) => {
    const data = await api.getRoomInfo(roomID);
    if (!data.hasStarted && max_players > player_amount) {
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
						  Jugadores : {room.player_amount} / {room.max_players}
						</span>
						{!(CanJoin(room.id, room.max_players, room.player_amount)) && (
              <button onClick={() => JoinGame(room.id)}>Unirse</button>
            )}
            <div>{room.player_amount === room.max_players && <span>La sala esta llena</span>}</div>
            <div>{(CanJoin(room.id, room.max_players, room.player_amount)) && <span>La sala esta en juego</span>}</div>
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
}

export default Modal;