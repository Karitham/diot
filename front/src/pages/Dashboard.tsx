import { FunctionComponent } from 'react'
import AlertContainer from '../components/AlertContainer'
import CamContainer, { CamContainerType } from '../components/CamContainer'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'
import { subscribePush } from '../api/sw'
import { ws } from '../api/ws'
import CamSensor from '../components/CamSensor'

const alert = {
  dateTime: '/vector3.svg',
  dateTimeText: 'Fire Alert',
  timeText: 'Just now ',
  propBackgroundColor: '#c33e22'
}
const alerts = [alert]

const camClick = { camName: 'Living Room', camURL: '/livingroom.png' }

const cams: CamContainerType[] = [
  { camName: 'Living Room', camURL: '/livingroom.png' },
  { camName: 'The week Room', camURL: '/livingroom.png' },
  { camName: 'DSAHJKDASD Room', camURL: '/livingroom.png', disabled: true },
  { camName: 'DSAGKYDHYEDHQBLIDUHQWDU*OIQLNDQWIDULN Room', camURL: '/livingroom.png', alert: true },
  { camName: 'The backroom', camURL: '/livingroom.png', disabled: true }
]

const Dashboard: FunctionComponent = () => {
  window.addEventListener('load', () => {
    // TODO(@chp567): Make sure we're logged in
    subscribePush()
    // ws is just a mock for now
    ws()
  })

  const SensorData1 = {
    sensorName: 'Capteur 1',
    temperature: '11°C',
    humidity: '90%',
    airQuality: 'Bad',
    alert: false, // Alerte activée/désactivé
    disabled: false
  }
  const SensorData2 = {
    sensorName: 'Capteur 1',
    temperature: '25°C',
    humidity: '50%',
    airQuality: 'Good',
    alert: true, // Alerte activée/désactivé
    disabled: false
  }

  const SensorDatas = [SensorData1, SensorData2]

  return (
    <div className="dashboard2">
      <Navbar settingsText="" />

      <div className="contentwrapper1">
        {alerts.map(a => (
          <AlertContainer dateTime={a.dateTime} dateTimeText={a.dateTimeText} timeText={a.timeText} alert />
        ))}
        <div className="camscontainer">
          <div className="titlecontainer1">
            <img className="pause-icon1" alt="" src="/pause1.svg" />
            <div className="titre2">Dashboard</div>
          </div>
          <div className="cam-grid-container">
            <CamContainer {...camClick} alert fullwidth />
            {cams.map(c => (
              <CamContainer {...c} />
            ))}
            {SensorDatas.map(
              (s: {
                sensorName: string
                temperature: string
                humidity: string
                airQuality: string
                alert: boolean | undefined
                disabled: boolean | undefined
              }) => (
                <CamSensor
                  sensorName={s.sensorName}
                  temperature={s.temperature}
                  humidity={s.humidity}
                  airQuality={s.airQuality}
                  alert={s.alert}
                  disabled={s.disabled}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
