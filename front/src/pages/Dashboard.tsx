import { FunctionComponent, useEffect, useState } from 'react'
import AlertContainer, { AlertContainerProps } from '../components/AlertContainer'
import CamContainer, { CamContainerType } from '../components/CamContainer'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'
import { subscribePush } from '../api/sw'
import { Sensor, mapSensorData, ws } from '../api/ws'
import CamSensor, { SensorProps } from '../components/CamSensor'
import { client } from '../api/client'

const Dashboard: FunctionComponent = () => {
  const [alert, _] = useState<undefined | AlertContainerProps>()
  const [sensors, setSensors] = useState<Array<Sensor>>([])

  // on WebSocket message, update sensors, force rerender
  const onData = (data: MessageEvent) => {
    const sensorData = mapSensorData(sensors, JSON.parse(data.data))
    setSensors([...sensorData])
  }

  // onMount
  useEffect(() => {
    getSensors().then(setSensors)

    // TODO(@chp567): Make sure we're logged in
    subscribePush()

    ws(onData)
  }, [])

  return (
    <div className="dashboard2">
      <Navbar settingsText="" />

      <div className="contentwrapper1">
        <Alert alert={alert} />
        <div className="camscontainer">
          <div className="titlecontainer1">
            <img className="pause-icon1" alt="" src="/pause1.svg" />
            <div className="titre2">Dashboard</div>
          </div>
          <div className="cam-grid-container">
            <SensorGrid sensors={sensors} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

const getSensors = async (): Promise<Sensor[]> => {
  const resp = await client.get('/sensors', {})
  if (resp.error) {
    console.error(resp.error)
    return []
  }

  let out = [] as Sensor[]
  for (const s of resp.data) {
    out = mapSensorData(out, s)
  }

  return out
}

const Alert = (props: { alert?: AlertContainerProps }) => props.alert && <AlertContainer {...props.alert} />

const SensorGrid = (props: { sensors: Sensor[] }) => {
  if (!props.sensors) {
    return <div>Loading...</div>
  }

  return props.sensors.map(s => {
    if ('url' in s) {
      return <CamContainer {...(s as CamContainerType)} key={s.id} />
    } else {
      return <CamSensor {...(s as SensorProps)} key={s.id} />
    }
  })
}
