import React, { useState } from 'react';
import classes from '../styles/form-style.module.css';

const CreateGameForm = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameName, setGameName] = useState('');
  const [gameCreated, setGameCreated] = useState(false);

  const handleStartGame = () => {
    // Llama a la función onStartGame para indicar que la partida ha comenzado
    onStartGame();
  };

  const handleCreateGame = () => {
    // Realiza la lógica para crear la partida aquí si es necesario
    // Luego, establece gameCreated en true para mostrar el botón "Iniciar partida"
    if (playerName.trim()!=='' && gameName.trim()!==''){
      setGameCreated(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={classes['form-background']}>
      <h1>LA COSA</h1>
      <form action="" className={classes['form-container']}onSubmit={handleSubmit}>
        <h2>Crear partida</h2>
        <input
          type="text"
          required
          placeholder="Nombre del jugador"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Nombre de la partida"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <button onClick={handleCreateGame}>Crear partida</button>
        {gameCreated && (<button onClick={handleStartGame}>Iniciar partida</button>)}
      </form>
    </div>
  );
};

export default CreateGameForm;