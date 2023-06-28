import { FunctionComponent, useCallback, useState } from 'react'
import '../styles/compo/CamSensor.css'
import EditComponent from './EditComponent'
import PortalPopup from './PortalPopup'

export type SensorProps = {
  id: string
  label: string
  temperature?: string
  humidity?: string
  iaq?: string
  alert?: boolean
  disabled?: boolean
  fontColor?: string
}

const CamSensor: FunctionComponent<SensorProps> = (props: SensorProps) => {
  const [isEditComponentOpen, setEditComponentOpen] = useState(false)

  const openEditComponent = useCallback(() => {
    setEditComponentOpen(true)
  }, [])

  const closeEditComponent = useCallback(() => {
    setEditComponentOpen(false)
  }, [])

  const temperatureStyle = props.alert ? { color: props.fontColor || 'white' } : { color: props.fontColor || '#808080' }
  const cStyle = props.alert ? { color: props.fontColor || 'white' } : { color: props.fontColor || 'black' }

  const WrapInfo = (props: { data?: string; title: string; unit?: string }) => {
    if (!props.data) {
      return null
    }

    return (
      <div className="c-parent">
        <div className="c" style={cStyle}>
          {props.data} {props.unit && <span className="unit">{props.unit}</span>}
        </div>
        <div className="temperature" style={temperatureStyle}>
          {props.title}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`cam3 ${props.disabled ? 'disabled' : ''}`}>
        <div className="label">
          <div className="label-text">
            <img className="label-text-icon" alt="" src="/pause1.svg" />
            <div className="label-title">{props.label}</div>
          </div>
          <div className="label-icons">
            <img className="label-icon" alt="" src="/pen3.svg" onClick={openEditComponent} />
          </div>
        </div>
        <div className="frame-parent1" style={props.alert ? { backgroundColor: '#C33E22' } : {}}>
          <WrapInfo data={Number(props.temperature).toFixed(1)} title="temperature" unit="C°" />
          <WrapInfo data={Number(props.humidity).toFixed(1)} title="humidity" />
          <WrapInfo data={Number(props.iaq).toFixed(1)} title="air quality" />
        </div>
      </div>
      {isEditComponentOpen && (
        <PortalPopup overlayColor="rgba(113, 113, 113, 0.3)" placement="Centered" onOutsideClick={closeEditComponent}>
          <EditComponent onClose={closeEditComponent} />
        </PortalPopup>
      )}
    </>
  )
}

export default CamSensor
