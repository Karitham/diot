import { FunctionComponent } from "react";
import "../styles/FrameComponent.css";
const FrameComponent: FunctionComponent = () => {
  return (
    <div className="pin-parent">
      <div className="pin">
        <img className="vector-icon1" alt="" src="/vector1.svg" />
      </div>
      <img className="clock-icon" alt="" src="/clock.svg" />
      <div className="pin">
        <img className="vector-icon1" alt="" src="/vector2.svg" />
      </div>
      <div className="pin">
        <img className="vector-icon3" alt="" src="/vector3.svg" />
      </div>
    </div>
  );
};

export default FrameComponent;
