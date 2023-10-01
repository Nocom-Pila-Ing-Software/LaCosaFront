import classes from './CreateGameForm.module.css';


const CreateGameForm = () => {
  return (
    <div className={classes['form-background']}>
      <div>
        <h1>LA COSA</h1>
        <form action="" className={classes['form-container']}>
          <h2>Crear partida</h2>
          <label htmlFor='name'>Nombre de la partida</label>
          <input type="text" required id='name' />
          <button>Crear partida</button>
        </form>
      </div>
    </div>
  );
}

export default CreateGameForm;