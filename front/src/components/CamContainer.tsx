import { createRef, useCallback, useEffect, useState } from 'react'
import '../styles/compo/CamContainer.css'
import EditComponent from './EditComponent'
import PortalPopup from './PortalPopup'
import FlvJs from 'flv.js'

const CamContainer = (props: {
  fullwidth?: boolean
  disabled?: boolean
  label: string

  children: JSX.Element
}) => {
  const [isEditComponentOpen, setEditComponentOpen] = useState(false)

  const openEditComponent = useCallback(() => {
    setEditComponentOpen(true)
  }, [])

  const closeEditComponent = useCallback(() => {
    setEditComponentOpen(false)
  }, [])

  return (
    <>
      <div className={`cam-container ${props.fullwidth ? 'full-width' : ''} ${props.disabled ? 'disabled' : ''}`}>
        <div className="label">
          <div className="label-text">
            <img className="label-text-icon" alt="" src="/pause1.svg" />
            <div className="label-title">{props.label}</div>
          </div>
          <div className="label-icons">
            <img className="label-icon" alt="" src="/pen3.svg" onClick={openEditComponent} />
          </div>
        </div>
        {props.children}
      </div>
      {isEditComponentOpen && (
        <PortalPopup overlayColor="rgba(113, 113, 113, 0.3)" placement="Centered" onOutsideClick={closeEditComponent}>
          <EditComponent onClose={closeEditComponent} label={props.label} />
        </PortalPopup>
      )}
    </>
  )
}

export default CamContainer

export type CamContainerType = {
  id: string
  label: string
  url: string

  alert?: boolean
  disabled?: boolean
  fullwidth?: boolean
}

export const Cam = (props: CamContainerType) => {
  if (props.disabled || !FlvJs.isSupported())
    return (
      <div className="video disabled">
        <div className="disabled-text">
          <img className="disabled-icon" alt="" src="/start.svg" />
        </div>
      </div>
    )

  // create ref to video
  const videoRef = createRef<HTMLVideoElement>()

  useEffect(() => {
    const u = new URL(props.url)
    u.protocol = 'https'
    var flvPlayer = FlvJs.createPlayer({
      type: 'flv',
      isLive: true,
      hasAudio: false,
      hasVideo: true,
      cors: true,
      url: `${u}?api-key=${localStorage.getItem('token')}`
    })
    flvPlayer.attachMediaElement(videoRef.current!)
    flvPlayer.load()
    flvPlayer.play()
  }, [props.url, videoRef])

  return (
    <video
      id="videoElement"
      className="frame-parent1"
      ref={videoRef}
      style={{
        borderTop: props.alert ? '10px solid var(--colors-red)' : 'none'
      }}></video>
  )
}

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

export const Sensor = (props: SensorProps) => {
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
    <div className="frame-parent1" style={props.alert ? { backgroundColor: '#C33E22' } : {}}>
      <WrapInfo data={Number(props.temperature).toFixed(1)} title="temperature" unit="C°" />
      <WrapInfo data={Number(props.humidity).toFixed(1)} title="humidity" unit="%" />
      <WrapInfo data={Number(props.iaq).toFixed(1)} title="air quality" unit=" KOhms" />
    </div>
  )
}
