import { FunctionComponent, useCallback, useState } from 'react'
import LoginFormContainer from './LoginFormContainer'
import { useNavigate } from 'react-router-dom'
import '../styles/compo/LoginFormFilterContainer.css'
import { client } from '../api/client'

const LoginFormFilterContainer: FunctionComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<null | string>(null)

  const Error = () => error && <span className="error">{error}</span>

  const onButtonContainerClick = useCallback(async () => {
    if (!email || !password) {
      setError('Please fill all the fields')
      return
    }

    const resp = await client.post('/auth/login', {
      body: {
        email: email,
        password: password
      }
    })

    if (resp.error) {
      console.log(resp.error)
      return
    }

    localStorage.setItem('token', resp.data.token)

    navigate('/dashboard')
  }, [navigate, email, password])

  return (
    <form
      className="inputs-group"
      onKeyDown={k => {
        if (k.key === 'Enter') {
          onButtonContainerClick()
        }
      }}>
      <div className="inputs1">
        <Error />
        <LoginFormContainer title="Email" type="email" value={email} onInput={e => setEmail(e)} />
        <LoginFormContainer title="Password" value={password} type="password" onInput={e => setPassword(e)} />
      </div>
      <div className="button2" onClick={onButtonContainerClick}>
        <b className="click-me2">Log In</b>
      </div>
    </form>
  )
}

export default LoginFormFilterContainer
