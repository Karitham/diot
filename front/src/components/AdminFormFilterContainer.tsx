import { FunctionComponent, useCallback, useState } from 'react'
import AdminFormContainer from './AdminFormContainer'
import { useNavigate } from 'react-router-dom'
import '../styles/compo/AdminFormFilterContainer.css'
import { client } from '../api/client'

const LoginFormFilterContainer: FunctionComponent = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onButtonContainerClick = useCallback(async () => {
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
    <div className="inputs-group">
      <div className="inputs1">
        <AdminFormContainer title="Email" type="email" value={email} onInput={e => setEmail(e.currentTarget.value)} />
        <AdminFormContainer
          title="Password"
          value={password}
          type="password"
          onInput={e => setPassword(e.currentTarget.value)}
        />
      </div>
      <div className="button2" onClick={onButtonContainerClick}>
        <b className="click-me2">Log In</b>
      </div>
    </div>
  )
}

export default LoginFormFilterContainer
