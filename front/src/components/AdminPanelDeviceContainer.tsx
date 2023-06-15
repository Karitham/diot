import { FunctionComponent, memo } from "react";
import "../styles/compo/AdminPanelDeviceContainer.css";
const AdminPanelDeviceContainer: FunctionComponent = memo(() => {
  return (
    <div className="devices">
      <div className="devices1">Devices</div>
      <div className="accounts1">
        <div className="device-list">
          <div className="label1">
            <div className="text1">
              <div className="living-room-cam">Living Room Cam</div>
            </div>
            <img className="clap-icon1" alt="" src="/clap.svg" />
          </div>
          <div className="label1">
            <div className="text1">
              <div className="living-room-cam">Living Room Cam 2</div>
            </div>
            <img className="clap-icon1" alt="" src="/spinner.svg" />
          </div>
          <div className="label1">
            <div className="text1">
              <div className="living-room-cam">Bedroom Fire Captor</div>
            </div>
            <img className="clap-icon1" alt="" src="/checkbi.svg" />
          </div>
          <div className="label1">
            <div className="text1">
              <div className="living-room-cam">Bedroom Cam</div>
            </div>
            <img className="clap-icon1" alt="" src="/skull.svg" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminPanelDeviceContainer;
