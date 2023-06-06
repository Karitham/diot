import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginFormFilterContainer from "../components/LoginFormFilterContainer";
import "../styles/Login.css";
const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoSloganContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="login">
      <div className="logoslogan4" onClick={onLogoSloganContainerClick}>
        <img className="logotext-icon4" alt="" src="/logotext3.svg" />
        <b className="smart-homes-smarter4">Smart homes, smarter</b>
      </div>
      <div className="titre-group">
        <div className="titre4">Log In</div>
        <LoginFormFilterContainer />
      </div>
    </div>
  );
};

export default Login;
