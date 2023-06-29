export default (): [() => string | null, (token: string, expireAt: Date) => void, () => void] => {
  const getToken = () => {
    const expireAt = localStorage.getItem('tokenExpireAt')
    if (expireAt) {
      const expireAtDate = new Date(expireAt)
      if (expireAtDate > new Date()) {
        return localStorage.getItem('token')
      }
    }

    localStorage.removeItem('token')
    return null
  }

  const setToken = (token: string, expireAt: Date) => {
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpireAt', expireAt.toISOString())
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpireAt')
  }

  return [getToken, setToken, removeToken]
}
