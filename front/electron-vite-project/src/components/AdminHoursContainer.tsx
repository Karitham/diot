import { FunctionComponent } from 'react'
import '../styles/compo/AdminFormContainer.css'
import '../styles/compo/AdminDayContainer.css'
import '../styles/compo/AdminHoursContainer.css'

type AdminHoursContainerProps = {
  placeholder?: string
  name?: string
  title?: string
  description?: string
  value?: string
  onInput?: (value: string) => void
}

const AdminHoursContainer: FunctionComponent<AdminHoursContainerProps> = (props: AdminHoursContainerProps) => {
  return (
    <div className="input6s">
      <div className="login3s">{props.name}</div>
      <div className="preview-the-dayss">To select a time esier, click on the clock icon</div>
      <div className="input7s">
        <div className="admin-wrapper">
          <label htmlFor={props.title} className="admin-label">
            {props.title}
          </label>
          {props.description && <p className="admin-description">{props.description}</p>}
          <input
            type="time"
            name={props.title}
            title={props.title}
            className="admin-input-hours"
            value={props.value}
            onChange={e => props.onInput?.(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminHoursContainer
