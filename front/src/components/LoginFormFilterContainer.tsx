import { FunctionComponent, useCallback } from "react";
import LoginFormContainer from "./LoginFormContainer";
import { useNavigate } from "react-router-dom";
import "../styles/compo/LoginFormFilterContainer.css";
const LoginFormFilterContainer: FunctionComponent = () => {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onDontHaveAnClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="inputs-group">
      <div className="inputs1">
        <LoginFormContainer
          loginEmail="Email"
          loginPassword="Logging in will help you access actions such as viewing video feeds. To log in, please enter your username below."
          loginEmailAddress="charlus@perrus.com"
        />
        <LoginFormContainer
          loginEmail="Password"
          loginPassword="Logging in will help you access actions such as viewing video feeds. To log in, please enter your username below."
          loginEmailAddress="********************"
          propDisplay="none"
        />
      </div>
      <div className="button2" onClick={onButtonContainerClick}>
        <b className="click-me2">Log In</b>
      </div>
      <div className="dont-have-an" onClick={onDontHaveAnClick}>
        Don’t have an account?
      </div>
    </div>
  );
};

export default LoginFormFilterContainer;
