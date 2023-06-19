import { FunctionComponent } from 'react'
import AlertContainer from '../components/AlertContainer'
import '../styles/Notifications.css'
import Navbar from '../components/Navbar'

const alert = { dateTime: '/vector2.svg', dateTimeText: 'May 5th', timeText: '04:54' }

const alerts = [alert, alert, alert]

const Notifications: FunctionComponent = () => {
  return (
    <div className="notifications1">
      <Navbar settingsText="Notifications" />
      <div className="contentwrapper">
        <div className="notifications3">
          <div className="titre1">Notification History</div>
          <div className="alerts-parent">
            <div className="alerts">
              {alerts.map(a => (
                <div className="grow-container">
                  <AlertContainer dateTime={a.dateTime} dateTimeText={a.dateTimeText} timeText={a.timeText} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
