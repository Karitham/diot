import { FunctionComponent } from 'react'
import LoginFormFilterContainer from '../components/LoginFormFilterContainer';
import '../styles/Login.css'
import Logotext3 from '../assets/logotext3.svg'

const Login: FunctionComponent = () => {

  return (
    <div className="login">
      <div className="login-container">
        <div className="logoslogan4">
          <img className="logotext-icon4" alt="" src={Logotext3} />
          <b className="smart-homes-smarter4">Smart homes, smarter</b>
        </div>
        <div className="titre-group">
          <div className="titre4">Log In</div>
          <LoginFormFilterContainer />
        </div>
      </div>
    </div>
  )
}

export default Login
