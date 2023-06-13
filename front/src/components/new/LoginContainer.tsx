import { FunctionComponent, memo } from "react";
import "../styles/compo/LoginContainer.css";

type LoginContainerType = {
  emailAddress?: string;
  passwordText?: string;
};

const LoginContainer: FunctionComponent<LoginContainerType> = memo(
  ({ emailAddress, passwordText }) => {
    return (
      <div className="input20">
        <div className="login10">{emailAddress}</div>
        <div className="input21">
          <div className="lessgo-we-on9">{passwordText}</div>
          <div className="magnifyingglass15">
            <div className="magnifyingglass16">
              <img className="vector-icon20" alt="" src="/vector1.svg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default LoginContainer;
