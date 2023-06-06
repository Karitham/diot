import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NotificationHistoryContainer from "../components/NotificationHistoryContainer";
import "../styles/Notifications.css";
const Notifications: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoSloganContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onHomeTextClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="notifications2">
      <div className="alertfire">
        <div className="topnav2">
          <div className="logoslogan2" onClick={onLogoSloganContainerClick}>
            <img className="logotext-icon2" alt="" src="/logotext1.svg" />
            <b className="smart-homes-smarter2">Smart homes, smarter</b>
          </div>
          <div className="icons3">
            <img
              className="notification-icon2"
              alt=""
              src="/notification.svg"
            />
            <img className="notification-icon2" alt="" src="/user.svg" />
          </div>
        </div>
        <div className="breadcrumbs2">
          <div className="home2" onClick={onHomeTextClick}>
            Dashboard
          </div>
          <img className="caret-icon2" alt="" src="/caret.svg" />
          <div className="notifications3">Notifications</div>
        </div>
      </div>
      <div className="notifications4">
        <div className="titre2">Notification History</div>
        <div className="alerts">
          <NotificationHistoryContainer />
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icon-row">
              <div className="icongroup3">
                <img className="container-icon" alt="" src="/clock1.svg" />
                <div className="intrusion-warning">Intrusion warning</div>
              </div>
            </div>
            <div className="properties1">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Living Room</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">20h42 - 15/03/23</div>
              </div>
            </div>
          </div>
          <div className="alertfire">
            <div className="icongroup">
              <div className="container">
                <img className="pin-icon" alt="" src="/vector6.svg" />
              </div>
              <div className="intrusion-warning">Intrusion warning</div>
            </div>
            <div className="properties">
              <div className="icongroup">
                <div className="container">
                  <img className="pin-icon" alt="" src="/pin.svg" />
                </div>
                <div className="intrusion-warning">Bedroom</div>
              </div>
              <div className="icongroup">
                <img className="container-icon" alt="" src="/container.svg" />
                <div className="intrusion-warning">12h23 - 05/03/23</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
