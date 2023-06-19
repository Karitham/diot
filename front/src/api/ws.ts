import { API_URL } from './client'

export const ws = () => {
  const base = API_URL.replace('http', 'ws')
  const w = new WebSocket(`${base}/sensors/live?api-key=${localStorage.getItem('token')}`)

  w.onopen = () => {
    console.log('WebSocket Client Connected')
  }

  w.onmessage = message => {
    console.log(message)
  }

  w.onclose = () => {
    console.log('WebSocket Client Disconnected')
  }
}
