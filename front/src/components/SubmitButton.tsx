import { FunctionComponent } from 'react'
import '../styles/compo/SubmitButton.css'

type ButtonProps = {
  onClick?: () => void
  text?: string
  className?: string
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, text, className }) => {
  return (
    <button className={`button1 buttoncontainer1 hover-effect ${className ? className : ''}`} onClick={onClick}>
      <b className="button-save">{text}</b>
    </button>
  )
}

export default Button
