import classes from './CreateGameForm.module.css';


const CreateGameForm = () => {
  return (
    <div className={classes['form-background']}>
        <h1>LA COSA</h1>
        <form action="" className={classes['form-container']}>
          <h2>Crear una partida</h2>
          <input type="text" required id='name' placeholder='Nombre del jugador'/>
          <input type="text" required id='name' placeholder='Nombre de la partida'/>
          <button>Crear</button>
        </form>
      </div>
  );
}

export default CreateGameForm;