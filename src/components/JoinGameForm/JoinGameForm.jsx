import classes from './JoinGameForm.module.css';

const JoinGameForm = () => {
  return (
    <div className={classes['form-background']}>
      <div>
        <h1>LA COSA</h1>
        <form action="" className={classes['form-container']}>
          <h2>Unirse a una partida</h2>
          <label htmlFor="">Nombre de la partida</label>
          <input type="text" required/>
          <label htmlFor="">Tu nombre</label>
          <input type="text" name="" id="" required/>
          <button>Unirse</button>
        </form>
      </div>
    </div>
    )
}

export default JoinGameForm;