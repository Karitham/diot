import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "../styles/compo/LoginFormContainer.css";

type LoginFormContainerType = {
  loginEmail?: string;
  loginPassword?: string;
  loginEmailAddress?: string;

  /** Style props */
  propDisplay?: Property.Display;
  onChange?: (value: string) => void;
};

const LoginFormContainer: FunctionComponent<LoginFormContainerType> = ({
  loginEmail,
  loginPassword,
  loginEmailAddress,
  propDisplay,
  onChange,
}) => {
  const loggingInWillStyle: CSS.Properties = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  return (
    <div className="input5">
      <div className="login3">{loginEmail}</div>
      <div className="logging-in-will1" style={loggingInWillStyle}>
        {loginPassword}
      </div>
      <div className="input6">
        <input
          type="text"
          className="lessgo-we-on2"
          value={loginEmailAddress}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <div className="magnifyingglass3">
          <img className="vector-icon18" alt="" src="/vector7.svg" />
        </div>
      </div>
    </div>
  );
};

export default LoginFormContainer;
