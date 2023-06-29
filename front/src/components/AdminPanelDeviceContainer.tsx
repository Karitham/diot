import { FunctionComponent } from 'react'
import '../styles/compo/AdminPanelDeviceContainer.css'

export type AdminPanelDeviceContainerProps = {
  icon: JSX.Element
  name: string
}

const DeviceComponent: FunctionComponent<AdminPanelDeviceContainerProps> = (props: AdminPanelDeviceContainerProps) => {
  return (
    <div className="label1">
      <div className="text1 living-room-cam">{props.name}</div>
      <span className="clap-icon1">{props.icon}</span>
    </div>
  )
}

export default DeviceComponent
