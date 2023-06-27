import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthGuard = (props: { children: JSX.Element }) => {
  const navigate = useNavigate()

  // Vérifie si l'utilisateur est connecté ici
  const isLoggedIn = false // Remplacez par la logique réelle de vérification de la connexion

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/') // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [isLoggedIn, navigate])

  return <>{props.children}</>
}

export default AuthGuard
