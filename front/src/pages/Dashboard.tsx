import { FunctionComponent } from 'react'
import AlertContainer from '../components/AlertContainer'
import CamContainer, { CamContainerType } from '../components/CamContainer'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'
import { subscribePush } from '../api/sw'
import { ws } from '../api/ws'

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
