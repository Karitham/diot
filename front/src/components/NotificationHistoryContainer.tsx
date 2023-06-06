import { FunctionComponent } from "react";
import "../styles/compo/NotificationHistoryContainer.css";
const NotificationHistoryContainer: FunctionComponent = () => {
  return (
    <div className="alert8">
      <div className="icon-row7">
        <div className="icongroup46">
          <div className="fire1">
            <img className="vector-icon15" alt="" src="/vector5.svg" />
          </div>
          <div className="intrusion-warning15">Fire alert</div>
        </div>
      </div>
      <div className="properties15">
        <div className="icongroup47">
          <div className="fire1">
            <img className="pin-icon15" alt="" src="/pin.svg" />
          </div>
          <div className="intrusion-warning15">Living Room</div>
        </div>
        <div className="icongroup47">
          <img className="container-icon15" alt="" src="/container.svg" />
          <div className="intrusion-warning15">20h42 - 15/03/23</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationHistoryContainer;
