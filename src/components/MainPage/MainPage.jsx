import LoginForm from "./LoginForm"
import Title from "./Title"
import gas from '../../assets/gas-mask.png'
import classes from './MainPage.module.css'

const MainPage = () => {
  return (

    <div className={classes['main-page']}>
      <img className={classes.gas} src={gas} alt="" />
      <Title />
      <LoginForm />
    </div>
  )
}

export default MainPage