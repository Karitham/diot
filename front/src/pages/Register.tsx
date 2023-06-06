import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/LoginContainer";
import "../styles/Register.css";
const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoSloganContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="register">
      <div className="logoslogan3" onClick={onLogoSloganContainerClick}>
        <img className="logotext-icon3" alt="" src="/logotext2.svg" />
        <b className="smart-homes-smarter3">Smart homes, smarter</b>
      </div>
      <div className="titre-parent">
        <div className="titre3">Register</div>
        <LoginContainer />
      </div>
    </div>
  );
};

export default Register;
