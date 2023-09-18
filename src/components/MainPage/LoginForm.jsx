import { useState } from 'react'
import classes from './LoginForm.module.css'

const LoginForm = () => {
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(true);

  const nameInputHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true)
    }
    setName(event.target.value);
  }

  const formSubmitHandler = event => {
    event.preventDefault();
    if (name.trim().length === 0) {
      setIsValid(false);
      return;
    }

    event.target.submit()
  }

  return (
    <div className={`${classes['login-form']} ${!isValid && classes.invalid}`}>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="" className={classes['login-form__label']}>Ingresa tu nombre</label>
        <input type="text" placeholder='Nombre' onChange={nameInputHandler} />
        <button className={classes['login-form__button']}>Public Lobby</button>
        <button className={classes['login-form__button']}>Private room</button>
      </form>
    </div>
  )
}

export default LoginForm;