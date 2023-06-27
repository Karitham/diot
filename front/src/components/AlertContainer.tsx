import '../styles/compo/AlertContainer.css'

export type AlertContainerProps = {
  icon: string
  label: string
  time: Date
  sensor: string

  alert?: boolean
}

const AlertContainer = (props: AlertContainerProps) => {
  return (
    <div className="alert1">
      <div
        className="type"
        style={{
          backgroundColor: props.alert ? 'var(--colors-red)' : 'var(--colors-button)'
        }}>
        <div className="sneak3">
          <img className="vector-icon19" alt="" src={props.icon} />
        </div>
      </div>
      <div className="content">
        <div className="may-5th">{props.label}</div>
        <div className="properties1">
          <div className="may-5th">{props.time.getTime()}</div>
          <div className="may-5th">{props.time.getDate()}</div>
          <div className="may-5th">{props.sensor}</div>
        </div>
      </div>
    </div>
  )
}

export default AlertContainer
