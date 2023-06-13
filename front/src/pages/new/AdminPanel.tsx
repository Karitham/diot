import { FunctionComponent, useState, useCallback } from "react";
import UserAccount from "../components/UserAccount";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import AdminPanelContainer from "../components/AdminPanelContainer";
import AdminPanelDeviceContainer from "../components/AdminPanelDeviceContainer";
import "../styles/AdminPanel.css";
const AdminPanel: FunctionComponent = () => {
  const [isUserAccountOpen, setUserAccountOpen] = useState(false);
  const navigate = useNavigate();

  const openUserAccount = useCallback(() => {
    setUserAccountOpen(true);
  }, []);

  const closeUserAccount = useCallback(() => {
    setUserAccountOpen(false);
  }, []);

  const onTopNavContainerClick = useCallback(() => {
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

  const onLogoutContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <div className="admin-panel">
        <div className="nav">
          <div className="topnav" onClick={onTopNavContainerClick}>
            <div className="logoslogan">
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
            <div className="dashboard" onClick={onDashboardTextClick}>
              Dashboard
            </div>
            <div className="crumb1">
              <img className="caret-icon" alt="" src="/caret.svg" />
              <div className="notifications" onClick={onNotificationsTextClick}>
                Settings
              </div>
            </div>
            <div className="crumb2">
              <img className="caret-icon" alt="" src="/caret1.svg" />
              <div className="edit">Edit</div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="titlecontainer">
            <div className="titre">Settings</div>
          </div>
          <AdminPanelContainer />
          <AdminPanelDeviceContainer />
        </div>
        <div className="new-user" onClick={openUserAccount}>
          <b className="edit">New user</b>
        </div>
        <div className="logout" onClick={onLogoutContainerClick}>
          <b className="edit">Log out</b>
        </div>
      </div>
      {isUserAccountOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeUserAccount}
        >
          <UserAccount onClose={closeUserAccount} />
        </PortalPopup>
      )}
    </>
  );
};

export default AdminPanel;
