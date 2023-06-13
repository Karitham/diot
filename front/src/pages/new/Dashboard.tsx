import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AlertContainer from "../components/AlertContainer";
import CamContainer from "../components/CamContainer";
import CamDisableContainer from "../components/CamDisableContainer";
import "../styles/Dashboard.css";
const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoSloganContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onNotificationIconClick = useCallback(() => {
    navigate("/notifications");
  }, [navigate]);

  const onDashboardTextClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onNotificationsTextClick = useCallback(() => {
    navigate("/notifications");
  }, [navigate]);

  return (
    <div className="dashboard2">
      <div className="nav2">
        <div className="topnav2">
          <div className="logoslogan2" onClick={onLogoSloganContainerClick}>
            <img className="logotext-icon2" alt="" src="/logotext2.svg" />
            <b className="smart-homes-smarter2">Smart homes, smarter</b>
          </div>
          <div className="icons2">
            <img
              className="notification-icon2"
              alt=""
              src="/notification.svg"
              onClick={onNotificationIconClick}
            />
            <img className="user-icon2" alt="" src="/user.svg" />
          </div>
        </div>
        <div className="breadcrumbs2">
          <div className="dashboard3" onClick={onDashboardTextClick}>
            Dashboard
          </div>
          <div className="crumb12">
            <img className="caret-icon4" alt="" src="/caret2.svg" />
            <div className="notifications4" onClick={onNotificationsTextClick}>
              Notifications
            </div>
          </div>
          <div className="crumb22">
            <img className="caret-icon4" alt="" src="/caret1.svg" />
            <div className="edit2">Edit</div>
          </div>
        </div>
      </div>
      <div className="contentwrapper1">
        <AlertContainer
          dateTime="/vector8.svg"
          dateTimeText="Fire Alert"
          timeText="Just now "
          propBackgroundColor="#c33e22"
          propWidth="1.02rem"
          propAlignSelf="unset"
          propDisplay="none"
        />
        <div className="camscontainer">
          <div className="titlecontainer1">
            <img className="pause-icon1" alt="" src="/pause1.svg" />
            <div className="titre2">Dashboard</div>
          </div>
          <div className="gridcontainer">
            <div className="cams">
              <CamContainer
                roomName="Living Room"
                roomImageId="/livingroom@2x.png"
              />
              <CamContainer
                roomName="Bedroom"
                roomImageId="/bedroom@2x.png"
                propHeight="16.06rem"
              />
              <CamDisableContainer
                roomId="/start.svg"
                roomName="Hallway 1"
                roomDimensions="/pen5.svg"
              />
              <CamContainer
                roomName="Bathroom"
                roomImageId="/livingroom1@2x.png"
                propHeight="12.94rem"
              />
            </div>
            <div className="cams">
              <CamContainer
                roomName="Living Room"
                roomImageId="/bedroom@2x.png"
                propHeight="16.06rem"
              />
              <CamDisableContainer
                roomId="/pause2.svg"
                roomName="Bedroom"
                roomDimensions="/pen4.svg"
                propColor="#000"
                propCursor="pointer"
              />
              <CamDisableContainer
                roomId="/start.svg"
                roomName="Hallway 1"
                roomDimensions="/pen5.svg"
                propColor="#808080"
                propCursor="unset"
              />
              <CamContainer
                roomName="Bathroom"
                roomImageId="/livingroom1@2x.png"
                propHeight="12.94rem"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
