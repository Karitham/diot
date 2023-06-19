import { memo } from 'react'
import '../styles/compo/AlertContainer.css'

type AlertContainerType = {
  dateTime?: string
  dateTimeText?: string
  timeText?: string

  alert?: boolean
}

const AlertContainer = memo((props: AlertContainerType) => {
  return (
    <div className="alert1">
      <div
        className="type"
        style={{
          backgroundColor: props.alert ? 'var(--colors-red)' : 'var(--colors-button)'
        }}>
        <div className="sneak3">
          <img className="vector-icon19" alt="" src={props.dateTime} />
        </div>
      </div>
      <div className="content">
        <div className="may-5th">{props.dateTimeText}</div>
        <div className="properties1">
          <div className="may-5th">{props.timeText}</div>
          <div className="may-5th">12/05/22</div>
          <div className="may-5th">Living Room</div>
        </div>
      </div>
    </div>
  )
})

export default AlertContainer
