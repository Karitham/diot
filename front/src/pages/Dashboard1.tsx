import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CamContainer from "../components/CamContainer";
import Hallway1Container from "../components/Hallway1Container";
import "../styles/Dashboard1.css";
const Dashboard1: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoSloganContainerClick = useCallback(() => {
    navigate("/dashboard1");
  }, [navigate]);

  const onNotificationIconClick = useCallback(() => {
    navigate("/notifications");
  }, [navigate]);

  return (
    <div className="dashboard1">
      <div className="nav1">
        <div className="topnav1">
          <div className="logoslogan1" onClick={onLogoSloganContainerClick}>
            <img className="logotext-icon1" alt="" src="/logotext.svg" />
            <b className="smart-homes-smarter1">Smart homes, smarter</b>
          </div>
          <div className="icons2">
            <img
              className="notification-icon1"
              alt=""
              src="/notification.svg"
              onClick={onNotificationIconClick}
            />
            <img className="user-icon1" alt="" src="/user.svg" />
          </div>
        </div>
        <div className="breadcrumbs1">
          <div className="home1">Dashboard</div>
          <img className="caret-icon1" alt="" src="/caret.svg" />
          <div className="notifications1">Notifications</div>
        </div>
      </div>
      <div className="camscontainer1">
        <div className="titre1">Dashboard</div>
        <div className="cams1">
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

export default Dashboard1;
