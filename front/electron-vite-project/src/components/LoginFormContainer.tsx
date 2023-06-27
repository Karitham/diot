import { FunctionComponent } from 'react'
import '../styles/compo/LoginFormContainer.css'

type LoginFormContainerType = {
  title?: string
  description?: string
  value?: string
  type?: string

  onInput?: (value: string) => void
}

const LoginFormContainer: FunctionComponent<LoginFormContainerType> = (props: LoginFormContainerType) => {
  return (
    <div className="login-wrapper">
      <label htmlFor={props.title} className="login-label">
        {props.title}
      </label>
      {props.description && <p className="login-description">{props.description}</p>}
      <input
        name={props.title}
        title={props.title}
        type={props.type}
        className="login-input"
        value={props.value}
        onInput={e => props.onInput?.(e.currentTarget.value)}
      />
    </div>
  )
}

export default LoginFormContainer
