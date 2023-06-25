import { FunctionComponent } from 'react'
import '../styles/compo/AdminPanelDeviceContainer.css'

type AdminPanelDeviceContainerProps = {
  src: string
  name: string
}

const DeviceComponent: FunctionComponent<AdminPanelDeviceContainerProps> = ({ src, name }) => {
  return (
    <>
      <div className="label1">
        <div className="text1">
          <div className="living-room-cam">{name}</div>
        </div>
        <img className="clap-icon1" alt="" src={src} />
      </div>
    </>
  )
}

export default DeviceComponent
