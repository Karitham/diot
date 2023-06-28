import { FunctionComponent, InputHTMLAttributes } from 'react'
import '../styles/compo/AdminFormContainer.css'

export type AdminFormContainerType = {
  description?: string
  icon?: JSX.Element
} & InputHTMLAttributes<HTMLInputElement>

const AdminFormContainer: FunctionComponent<AdminFormContainerType> = (props: AdminFormContainerType) => {
  return (
    <label htmlFor={props.title} className="admin-label">
      {props.title}
      <div className="admin-wrapper">
        {props.description && <p className="admin-description">{props.description}</p>}
        <input {...props} name={props.title} title={props.title} className="admin-input" />
        {!!props.icon && ( // Si la propriété icon est définie
          <span className="admin-pen-icon100">{props.icon}</span>
        )}
      </div>
    </label>
  )
}

export default AdminFormContainer
