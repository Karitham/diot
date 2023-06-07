import { FunctionComponent, useMemo } from 'react'
import CSS, { Property } from 'csstype'
import '../styles/compo/LoginFormContainer.css'

type LoginFormContainerType = {
  loginEmail?: string
  loginPassword?: string
  loginEmailAddress?: string

  /** Style props */
  propDisplay?: Property.Display
  onChange?: (value: string) => void
}

const LoginFormContainer: FunctionComponent<LoginFormContainerType> = ({
  loginEmail: title,
  loginPassword: description,
  loginEmailAddress: value,
  propDisplay,
  onChange
}) => {
  const loggingInWillStyle: CSS.Properties = useMemo(() => {
    return {
      display: propDisplay
    }
  }, [propDisplay])

  return (
    <div className="login-wrapper">
      <label htmlFor={title} className="login-label">
        {title}
      </label>
      {description && (
        <p className="login-description" style={loggingInWillStyle}>
          {description}
        </p>
      )}
      <input
        name={title}
        title={title}
        type="text"
        className="login-input"
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  )
}

export default LoginFormContainer
