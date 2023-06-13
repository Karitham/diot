import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AlertContainer from "../components/AlertContainer";
import "../styles/Notifications.css";
const Notifications: FunctionComponent = () => {
  const navigate = useNavigate();

  const onTopNavContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

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
    <div className="notifications1">
      <div className="nav1">
        <div className="topnav1" onClick={onTopNavContainerClick}>
          <div className="logoslogan1" onClick={onLogoSloganContainerClick}>
            <img className="logotext-icon1" alt="" src="/logotext1.svg" />
            <b className="smart-homes-smarter1">Smart homes, smarter</b>
          </div>
          <div className="icons1">
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
          <div className="dashboard1" onClick={onDashboardTextClick}>
            Dashboard
          </div>
          <div className="crumb11">
            <img className="caret-icon2" alt="" src="/caret.svg" />
            <div className="notifications2" onClick={onNotificationsTextClick}>
              Notifications
            </div>
          </div>
          <div className="crumb21">
            <img className="caret-icon2" alt="" src="/caret1.svg" />
            <div className="edit1">Edit</div>
          </div>
        </div>
      </div>
      <div className="contentwrapper">
        <div className="notifications3">
          <div className="titre1">Notification History</div>
          <div className="alerts-parent">
            <div className="alerts">
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
              />
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector5.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
            </div>
            <div className="alerts1">
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector6.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
            </div>
            <div className="alerts1">
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
              <AlertContainer
                dateTime="/vector7.svg"
                dateTimeText="May 5th"
                timeText="04:54"
                propBackgroundColor="#415d4a"
                propWidth="0.98rem"
                propAlignSelf="stretch"
                propDisplay="inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
