import classes from './CreateGameForm.module.css';

const CreateGameForm = () => {
    return (
        <div className={classes['form-background']}>
            <h2>Crear juego</h2>
            <form className={classes['form-container']}>
                <div className={classes.control}>
                    <label htmlFor='name'>Nombre del juego</label>
                    <input type='text' required id='name' />
                </div>
                <div className={classes.actions}>
                    <button>Crear</button>
                </div>
            </form>
        </div>
    );
}

export default CreateGameForm;