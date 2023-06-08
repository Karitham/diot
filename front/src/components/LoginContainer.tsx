import { FunctionComponent, useCallback, useState } from 'react'
import LoginFormContainer from './LoginFormContainer'
import { useNavigate } from 'react-router-dom'
import '../styles/compo/LoginContainer.css'

const LoginContainer: FunctionComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const onButtonContainerClick = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const onAlreadyGotAnClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div className="inputs-parent">
      <div className="inputs">
        <LoginFormContainer
          title="Email"
          description="Logging in will help you access actions such as viewing video feeds. To log in, please enter your username below."
          value={email}
          onInput={value => setEmail(value)}
        />
        <LoginFormContainer
          title="Password"
          description="Logging in will help you access actions such as viewing video feeds. To log in, please enter your username below."
          value={password}
          onInput={value => setPassword(value)}
        />
        <LoginFormContainer
          title="Password 2: Electric Boogaloo"
          description="Please type your password a second time so you can make sure to have typed it right."
          value={password2}
          onInput={value => setPassword2(value)}
        />
      </div>
      <div className="button1" onClick={onButtonContainerClick}>
        <b className="click-me1">Register</b>
      </div>
      <div className="already-got-an" onClick={onAlreadyGotAnClick}>
        Already got an account?
      </div>
    </div>
  )
}

export default LoginContainer
