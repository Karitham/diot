import { FunctionComponent } from 'react';
import "../styles/compo/SubmitButton.css"

type ButtonProps = {
  onClick?: () => void;
  text?: string;
};

const Button: FunctionComponent<ButtonProps> = ({ onClick, text }) => {
  return (
    <div className="buttoncontainer1">
      <button className="button1" onClick={onClick}>
        <b className="button-save">{text}</b>
      </button>
    </div>
  );
};

export default Button;
