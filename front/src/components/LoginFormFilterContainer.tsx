import { FunctionComponent, useCallback, useState } from 'react'
import LoginFormContainer from './LoginFormContainer'
import { useNavigate } from 'react-router-dom'
import '../styles/compo/LoginFormFilterContainer.css'

const LoginFormFilterContainer: FunctionComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onButtonContainerClick = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const onDontHaveAnClick = useCallback(() => {
    navigate('/register')
  }, [navigate])

  return (
    <div className="inputs-group">
      <div className="inputs1">
        <LoginFormContainer loginEmail="Email" loginEmailAddress={email} onChange={value => setEmail(value)} />
        <LoginFormContainer
          loginEmail="Password"
          loginEmailAddress={password}
          propDisplay="none"
          onChange={value => setPassword(value)}
        />
      </div>
      <div className="button2" onClick={onButtonContainerClick}>
        <b className="click-me2">Log In</b>
      </div>
      <div className="dont-have-an" onClick={onDontHaveAnClick}>
        Don’t have an account?
      </div>
    </div>
  )
}

export default LoginFormFilterContainer
