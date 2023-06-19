import { API_URL } from './client'

export const ws = () => {
  const w = new WebSocket(API_URL.replace('http', 'ws') + '/sensors/live')

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
