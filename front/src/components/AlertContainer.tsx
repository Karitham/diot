import '../styles/compo/AlertContainer.css'

export type AlertContainerProps = {
  icon: JSX.Element
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
        <div className={`icon${props.alert ? ' alert' : ''}`}>{props.icon}</div>
      </div>
      <div className="content">
        <div className="label">{props.label}</div>
        <div className="properties1">
          <div className="may-5th">
            {props.time.toLocaleDateString('default', {
              day: 'numeric',
              month: 'short'
            })}
          </div>
          <div className="may-5th">
            {props.time.toLocaleTimeString('default', {
              hour: 'numeric',
              minute: 'numeric'
            })}
          </div>
          <div className="may-5th">{props.sensor}</div>
        </div>
      </div>
    </div>
  )
}

export default AlertContainer
