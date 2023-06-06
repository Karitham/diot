import { FunctionComponent, useCallback } from "react";
import LoginFormContainer from "./LoginFormContainer";
import { useNavigate } from "react-router-dom";
import "../styles/compo/LoginContainer.css";
const LoginContainer: FunctionComponent = () => {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onAlreadyGotAnClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="inputs-parent">
      <div className="inputs">
        <LoginFormContainer
          loginEmail="Email"
          loginPassword="Logging in will help you access actions such as viewing video feeds. To log in, please enter your username below."
          loginEmailAddress="charlus@perrus.com"
          propDisplay="none"
        />
        <LoginFormContainer
          loginEmail="Password"
          loginPassword="Logging in will help you access actions such as viewing video feeds. To log in, please enter your username below."
          loginEmailAddress="********************"
          propDisplay="none"
        />
        <LoginFormContainer
          loginEmail="Password 2: Electric Boogaloo"
          loginPassword="Please type your password a second time so you can make sure to have typed it right."
          loginEmailAddress="********************"
          propDisplay="inline-block"
        />
      </div>
      <div className="button1" onClick={onButtonContainerClick}>
        <b className="click-me1">Register</b>
      </div>
      <div className="already-got-an" onClick={onAlreadyGotAnClick}>
        Already got an account?
      </div>
    </div>
  );
};

export default LoginContainer;
