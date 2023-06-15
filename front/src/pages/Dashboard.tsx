import { FunctionComponent } from "react";
import AlertContainer from "../components/AlertContainer";
import CamContainer from "../components/CamContainer";
import CamDisableContainer from "../components/CamDisableContainer";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="dashboard2">
      <Navbar settingsText="" />
      <div className="contentwrapper1">
        <AlertContainer
          dateTime="/vector3.svg"
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
              />
              <CamDisableContainer
                roomId="/start.svg"
                roomName="Hallway 1"
                roomDimensions="/pen1.svg"
              />
              <CamContainer
                roomName="Bathroom"
                roomImageId="/livingroom1@2x.png"
              />
              <CamContainer
                roomName="Living Room"
                roomImageId="/bedroom@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
