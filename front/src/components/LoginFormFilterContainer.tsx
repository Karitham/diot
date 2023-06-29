import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import LoginFormContainer from './LoginFormContainer'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/compo/LoginFormFilterContainer.css'
import { client } from '../api/client'
import useAuth from '../api/useAuth'

const LoginFormFilterContainer: FunctionComponent = () => {
  const navigate = useNavigate()
  const [token, setToken] = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    if (token()) {
      navigate('/dashboard')
    }
  }, [token, navigate])

  const Error = () => error && <span className="error">{error}</span>

  const onButtonContainerClick = useCallback(async () => {
    if (!email || !password) {
      setError('Please fill all the fields')
      toast.error('Erreur de connexion. Veuillez réessayer.', {
        autoClose: 1000
      })

      return
    }

    const resp = await client.post('/auth/login', {
      body: {
        email: email,
        password: password
      }
    })

    if (resp.error) {
      toast.error('Erreur de connexion. Veuillez réessayer.')
      console.log(resp.error)
      return
    }

    setToken(resp.data.token, new Date(resp.data.expire_at))
    toast.success('Connexion réussie !')
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
