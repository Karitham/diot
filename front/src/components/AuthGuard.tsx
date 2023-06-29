import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../api/useAuth'

const AuthGuard = (props: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const [getToken] = useAuth()

  // Vérifie si l'utilisateur est connecté ici
  useEffect(() => {
    !getToken() && navigate('/') // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
  }, [getToken, navigate])

  return <>{props.children}</>
}

export default AuthGuard
