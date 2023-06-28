import { FunctionComponent } from 'react'
import '../styles/compo/AdminFormContainer.css'

export type AdminFormContainerType = {
  placeholder?: string
  title?: string
  description?: string
  value?: string
  type?: string
  onInput?: (value: string) => void
  icon?: JSX.Element
}

const AdminFormContainer: FunctionComponent<AdminFormContainerType> = (props: AdminFormContainerType) => {
  return (
    <div className="admin-wrapper">
      <label htmlFor={props.title} className="admin-label">
        {props.title}
      </label>
      {props.description && <p className="admin-description">{props.description}</p>}
      <input
        name={props.title}
        title={props.title}
        type={props.type}
        placeholder={props.placeholder}
        className="admin-input"
        value={props.value}
        onInput={e => props.onInput?.(e.currentTarget.value)}
      />
      {!!props.icon && ( // Si la propriété icon est définie
        <span className="admin-pen-icon100">{props.icon}</span>
      )}
    </div>
  )
}

export default AdminFormContainer
