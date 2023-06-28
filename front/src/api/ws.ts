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
  switch (data.kind as string) {
    case 'camera':
      inD.push({
        label: data.label,
        id: data.id,
        url: (data.data as components['schemas']['SensorInfoCamera']).feed_uri
      } as CamProps)
      break
    default:
      // find existing sensor
      const exIDx = (inD as SensorProps[]).findIndex(s2 => data.id === s2.id)
      if (exIDx !== -1) {
        // set existing's data
        Object.assign(inD[exIDx], data.data)
      } else {
        // create new sensor
        inD.push({
          id: data.id,
          label: data.label,
          ...data.data
        } as SensorProps)
      }
  }

  return inD
}
