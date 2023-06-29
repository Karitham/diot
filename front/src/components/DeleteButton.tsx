import { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/compo/DeleteButton.css';
import 'react-toastify/dist/ReactToastify.css'


type ButtonProps = {
  onClick?: () => void;
  text?: string;
};

const Button: FunctionComponent<ButtonProps> = ({ onClick, text }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      toast.success("Successfully deleted");
    }
  };

  return (
    <button className="buttoncontainer1 hover-effect button6" onClick={handleClick}>
      <b className="button-save6">{text}</b>
    </button>
  );
};

export default Button;
