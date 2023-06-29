import { FunctionComponent } from 'react'
import '../styles/compo/SubmitButton.css'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ButtonProps = {
  onClick?: () => void
  text?: string
  className?: string
  toastMessage?: string
  toastType?: 'success' | 'error' | 'info'
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, text, className, toastMessage, toastType }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      if (toastMessage) {
        switch (toastType) {
          case 'success':
            toast.success(toastMessage, {

            });
            break;
          case 'error':
            toast.error(toastMessage, {

            });
            break;
          case 'info':
            toast.info(toastMessage, {

            });
            break;
          default:
            toast.success(toastMessage, {

            });
            break;
        }
      }
    }
  };

  return (
    <button className={`button1 buttoncontainer1 hover-effect ${className ? className : ''}`} onClick={handleClick}>
      <b className="button-save">{text}</b>
    </button>
  );
};


export default Button
