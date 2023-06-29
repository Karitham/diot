import { FunctionComponent, useEffect, useState } from 'react'
import AlertContainer, { AlertContainerProps } from '../components/AlertContainer'
import CamContainer, { Cam, CamContainerType as CamProps, Sensor, SensorProps } from '../components/CamContainer'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'
import { subscribePush } from '../api/sw'
import { Sensor as SensorT, mapSensorData, ws } from '../api/ws'
import { client } from '../api/client'

const Dashboard: FunctionComponent = () => {
  const [alert, _] = useState<undefined | AlertContainerProps>()
  const [sensors, setSensors] = useState<Array<SensorT>>([])

  // on WebSocket message, update sensors, force rerender
  const onData = (data: MessageEvent) => setSensors([...mapSensorData(sensors, JSON.parse(data.data))])

  // onMount
  useEffect(() => {
    getSensors().then(setSensors)

    // TODO(@chp567): Make sure we're logged in
    subscribePush()

    ws(onData)
  }, [])

  return (
    <div className="dashboard2">
      <Navbar settingsText="" showBreadcrumbs={false} />

      <div className="contentwrapper1">
        <Alert alert={alert} />
        <div className="camscontainer">
          <div className="titlecontainer1">
            <img className="pause-icon1 hover-effect" alt="" src="/pause1.svg" />
            <div className="titre2">Dashboard</div>
          </div>
          <div className="cam-grid-container">
            <SensorGrid sensors={sensors} setSensors={setSensors} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

const getSensors = async (): Promise<SensorT[]> => {
  const resp = await client.get('/sensors', {})
  if (resp.error) {
    console.error(resp.error)
    return []
  }

  let out = [] as SensorT[]
  for (const s of resp.data) {
    out = mapSensorData(out, s)
  }

  return out
}

const Alert = (props: { alert?: AlertContainerProps }) => props.alert && <AlertContainer {...props.alert} />

const SensorGrid = (props: { sensors: SensorT[]; setSensors: (sensors: SensorT[]) => void }) => {
  if (!props.sensors) {
    return <div>Loading...</div>
  }

  return props.sensors.map(s => {
    if ('url' in s) {
      return (
        <CamContainer key={s.id} {...(s as CamProps)} id={s.id} refresh={() => getSensors().then(props.setSensors)}>
          <Cam {...(s as CamProps)} id={s.id} />
        </CamContainer>
      )
    } else {
      return (
        <CamContainer key={s.id} {...(s as SensorProps)} id={s.id} refresh={() => getSensors().then(props.setSensors)}>
          <Sensor {...(s as SensorProps)} id={s.id} />
        </CamContainer>
      )
    }
  })
}
