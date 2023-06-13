import { FunctionComponent, useCallback, useState } from 'react'
import LoginFormContainer from './LoginFormContainer'
import { useNavigate } from 'react-router-dom'
import createClient from 'openapi-fetch'
import { paths } from '../api/api'
import '../styles/compo/LoginFormFilterContainer.css'

const LoginFormFilterContainer: FunctionComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const client = createClient<paths>({
    baseUrl: 'https://api.idiot.0xf.fr/v1'
  })

  const onButtonContainerClick = useCallback(async () => {
    const resp = await client.post('/auth/login', { 
      params: {
        query: {
          email: email,
          password: password
        }
      }
    })

    if (resp.error) {
      console.log(resp.error)
      return
    }

    navigate('/dashboard')
  }, [navigate, email, password])

  return (
    <div className="inputs-group">
      <div className="inputs1">
        <LoginFormContainer title="Email" type="email" value={email} onInput={e => setEmail(e)} />
        <LoginFormContainer title="Password" value={password} type="password" onInput={e => setPassword(e)} />
      </div>
      <div className="button2" onClick={onButtonContainerClick}>
        <b className="click-me2">Log In</b>
      </div>
    </div>
  )
}

export default LoginFormFilterContainer
