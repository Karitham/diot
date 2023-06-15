import { FunctionComponent, useState, useCallback } from "react";
import UserAccount from "../components/UserAccount";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import AdminPanelContainer from "../components/AdminPanelContainer";
import AdminPanelDeviceContainer from "../components/AdminPanelDeviceContainer";
import "../styles/AdminPanel.css";
import Navbar from "../components/navbar";

const AdminPanel: FunctionComponent = () => {
  const [isUserAccountOpen, setUserAccountOpen] = useState(false);
  const navigate = useNavigate();

  const openUserAccount = useCallback(() => {
    setUserAccountOpen(true);
  }, []);

  const closeUserAccount = useCallback(() => {
    setUserAccountOpen(false);
  }, []);

  const onLogoutContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <div className="admin-panel">
        <Navbar settingsText="Settings" />
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
