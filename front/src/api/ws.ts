import { CamContainerType as CamProps, SensorProps } from '../components/CamContainer'
import { components } from './api'
import { API_URL } from './client'

export const ws = (onData: (e: MessageEvent) => void) => {
  const base = API_URL.replace('http', 'ws')
  const w = new WebSocket(`${base}/sensors/live?api-key=${localStorage.getItem('token')}`)

  w.onopen = () => console.log('WebSocket Client Connected')
  w.onclose = () => console.log('WebSocket Client Disconnected')
  w.onmessage = onData

  return w
}

export type Sensor = CamProps | SensorProps

export const mapSensorData = (inD: Sensor[], data: components['schemas']['SensorInfo']): Sensor[] => {
  if ('feed_uri' in data.data) {
    inD.push({
      id: data.id,
      label: data.label,
      url: (data.data as any).feed_uri
    } as Sensor)
    return inD
  }

  // if id doesn't exist, add it
  if (!inD.find(d => d.id === data.id)) {
    inD.push({
      id: data.id,
      label: data.label,
      ...data.data
    } as SensorProps)
    return inD
  }

  // find sensor to update that's not a camera
  const sensorIdx = inD.findIndex(d => d.id === data.id && !('url' in d))
  inD[sensorIdx] = {
    ...inD[sensorIdx],
    ...data.data,
    label: inD[sensorIdx].label
  }

  return inD
}
