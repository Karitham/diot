import { FunctionComponent } from 'react'
import '../styles/compo/DeleteButton.css'

type ButtonProps = {
  onClick?: () => void
  text?: string
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, text }) => {
  return (
    <button className="buttoncontainer1 hover-effect button6" onClick={onClick}>
      <b className="button-save6">{text}</b>
    </button>
  )
}

export default Button
