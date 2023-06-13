import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CamContainer from "../components/CamContainer";
import Hallway1Container from "../components/Hallway1Container";
import "../styles/Dashboard.css";
const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoSloganContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onNotificationIconClick = useCallback(() => {
    navigate("/notifications");
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="nav">
        <div className="topnav">
          <div className="logoslogan" onClick={onLogoSloganContainerClick}>
            <img className="logotext-icon" alt="" src="/logotext.svg" />
            <b className="smart-homes-smarter">Smart homes, smarter</b>
          </div>
          <div className="icons">
            <img
              className="notification-icon"
              alt=""
              src="/notification.svg"
              onClick={onNotificationIconClick}
            />
            <img className="user-icon" alt="" src="/user.svg" />
          </div>
        </div>
        <div className="breadcrumbs">
          <div className="home">Dashboard</div>
          <img className="caret-icon" alt="" src="/caret.svg" />
          <div className="notifications">Notifications</div>
        </div>
      </div>
      <div className="alert-card">
        <div className="input">
          <div className="intrusion-alert-parent">
            <div className="intrusion-alert">Intrusion Alert</div>
            <div className="intrusion-alert-someone">
              Intrusion alert. Someone was located in the living room.
            </div>
          </div>
          <img className="vector-icon" alt="" src="/vector.svg" />
        </div>
      </div>
      <div className="camscontainer">
        <div className="titre">Dashboard</div>
        <div className="cams">
          <CamContainer
            roomName="Living Room"
            roomImageUrl="/livingroom@2x.png"
            propHeight="16.06rem"
          />
          <CamContainer
            roomName="Bedroom"
            roomImageUrl="/bedroom@2x.png"
            propHeight="16.06rem"
          />
          <Hallway1Container />
          <CamContainer
            roomName="Bathroom"
            roomImageUrl="/livingroom@2x.png"
            propHeight="12.94rem"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
