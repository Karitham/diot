import { FunctionComponent } from 'react';
import "../styles/compo/DeleteButton.css"

type ButtonProps = {
  onClick?: () => void;
  text?: string;
};

const Button: FunctionComponent<ButtonProps> = ({ onClick, text }) => {
  return (
    <div className="buttoncontainer6">
      <button className="button6" onClick={onClick}>
        <b className="button-save6">{text}</b>
      </button>
      </div>
  );
};

export default Button;