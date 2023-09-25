import classes from './Form.module.css';

const Form = () => {
    return (
        <div className={classes['form-background']}>
            <div>
                <h1>LA COSA</h1>
                
                <form action="" className={classes['form-container']}>
                    <h2>Unirse a una partida</h2>
                    <label htmlFor="">Nombre de la partida</label>
                    <br />
                    <input type="text" required/>
                    <br />
                    <button>Unirse</button>
                </form>
            </div>
        </div>
    )
}

export default Form;