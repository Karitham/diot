import { FunctionComponent } from 'react'
import AlertContainer from '../components/AlertContainer'
import CamContainer from '../components/CamContainer'
import CamDisableContainer from '../components/CamDisableContainer'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'

const alert = {
  dateTime: '/vector3.svg',
  dateTimeText: 'Fire Alert',
  timeText: 'Just now ',
  propBackgroundColor: '#c33e22',
  propWidth: '1.02rem',
  propAlignSelf: 'unset',
  propDisplay: 'none'
}

const camClick = { roomName: 'Living Room', roomImageId: '/livingroom@2x.png', borderTop: '10px solid #C33E22' }
const cam = { roomName: 'Living Room', roomImageId: '/livingroom@2x.png' }
const camDisable = { roomId: '/start.svg', roomName: 'Hallway 1', roomDimensions: '/pen1.svg' }

const alerts = [alert]
const camsClick = [camClick]
const cams = [cam, cam, cam, cam, cam]
const camsDisable = [camDisable, camDisable, camDisable, camDisable, camDisable]

const Dashboard: FunctionComponent = () => {
  return (
    <div className="dashboard2">
      <Navbar settingsText="" />
        
      <div className="contentwrapper1">
        {alerts.map(a => (
          <AlertContainer
            dateTime={a.dateTime}
            dateTimeText={a.dateTimeText}
            timeText={a.timeText}
            propBackgroundColor={a.propBackgroundColor}
            propWidth={a.propWidth}
            propAlignSelf={a.propAlignSelf}
            propDisplay={a.propDisplay}
          />
        ))}
        <div className="camscontainer">
          <div className="titlecontainer1">
            <img className="pause-icon1" alt="" src="/pause1.svg" />
            <div className="titre2">Dashboard</div>
          </div>
          {camsClick.map(c => (
          <div className="camsclick">
            <CamContainer 
              roomName={c.roomName}
              roomImageId={c.roomImageId}
              borderTop={c.borderTop}
              />
          </div>
          ))}
          <div className="gridcontainer">
            {cams.map(c => (
              <div className="cams grow-container">
                <CamContainer roomName={c.roomName} roomImageId={c.roomImageId} />
              </div>
            ))}
            {camsDisable.map(c => (
              <div className="cams grow-container">
                <CamDisableContainer roomId={c.roomId} roomName={c.roomName} roomDimensions={c.roomDimensions} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
