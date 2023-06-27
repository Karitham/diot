import { FunctionComponent, memo, useCallback, useState } from 'react'
import '../styles/compo/CamSensor.css'
import EditComponent from './EditComponent'
import PortalPopup from './PortalPopup'

export type CamSensorProps = {
  sensorName: string
  temperature: string
  humidity: string
  airQuality: string
  alert?: boolean
  disabled?: boolean
  fontColor?: string
}

const CamSensor: FunctionComponent<CamSensorProps> = memo(props => {
  const { sensorName, temperature, humidity, airQuality, alert, disabled, fontColor } = props

  const [isEditComponentOpen, setEditComponentOpen] = useState(false)

  const openEditComponent = useCallback(() => {
    setEditComponentOpen(true)
  }, [])

  const closeEditComponent = useCallback(() => {
    setEditComponentOpen(false)
  }, [])

  const temperatureStyle = alert ? { color: fontColor || 'white' } : { color: fontColor || '#808080' }
  const cStyle = alert ? { color: fontColor || 'white' } : { color: fontColor || 'black' }

  return (
    <>
      <div className={`cam3 ${disabled ? 'disabled' : ''}`}>
        <div className="label">
          <div className="label-text">
            <img className="label-text-icon" alt="" src="/pause1.svg" />
            <div className="label-title">{sensorName}</div>
          </div>
          <div className="label-icons">
            <img className="label-icon" alt="" src="/pen3.svg" onClick={openEditComponent} />
          </div>
        </div>
        <div className="frame-parent1" style={alert ? { backgroundColor: '#C33E22' } : {}}>
          <div className="c-parent">
            <div className="c" style={cStyle}>{temperature}</div>
            <div className="temperature" style={temperatureStyle}>temperature</div>
          </div>
          <div className="c-parent">
            <div className="c" style={cStyle}>{humidity}</div>
            <div className="temperature" style={temperatureStyle}>humidity</div>
          </div>
          <div className="c-parent">
            <div className="c" style={cStyle}>{airQuality}</div>
            <div className="temperature" style={temperatureStyle}>air quality</div>
          </div>
        </div>
      </div>
      {isEditComponentOpen && (
        <PortalPopup overlayColor="rgba(113, 113, 113, 0.3)" placement="Centered" onOutsideClick={closeEditComponent}>
          <EditComponent onClose={closeEditComponent} />
        </PortalPopup>
      )}
    </>
  )
})

export default CamSensor
