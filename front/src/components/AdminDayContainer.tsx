import { FunctionComponent } from 'react'
import '../styles/compo/AdminFormContainer.css'
import '../styles/compo/AdminDayContainer.css'

type AdminDayContainerProps = {
  placeholder?: string
  title?: string
  description?: string
  value?: string
  onInput?: (value: string) => void
  icon?: string // Nouvelle propriété pour le chemin d'accès de l'icône
}

const AdminDayContainer: FunctionComponent<AdminDayContainerProps> = (props: AdminDayContainerProps) => {
  return (
    <div className="admin-wrapper">
      <label htmlFor={props.title} className="admin-label">
        {props.title}
      </label>
      {props.description && <p className="admin-description">{props.description}</p>}
      <select
        name={props.title}
        title={props.title}
        className="admin-inputs"
        value={props.value}
        onChange={e => props.onInput?.(e.currentTarget.value)}
      >
        <option value="">Select a day</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
      <img className="admin-pen-icon100" alt="" src={props.icon} /> {/* Utilisation de la nouvelle propriété icon */}
    </div>
  )
}

export default AdminDayContainer
