import { FunctionComponent } from 'react'
import AlertContainer, { AlertContainerProps } from '../components/AlertContainer'
import '../styles/Notifications.css'
import Navbar from '../components/Navbar'

const alert: AlertContainerProps = {
  icon: '/vector2.svg',
  time: new Date(),
  sensor: 'Living Room Cam',
  label: 'Alert',
  alert: true
}

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
                  <AlertContainer {...a} />
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
