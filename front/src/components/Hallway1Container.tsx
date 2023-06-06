import { FunctionComponent } from "react";
import "../styles/compo/Hallway1Container.css";
const Hallway1Container: FunctionComponent = () => {
  return (
    <div className="cam1">
      <div className="label1">
        <div className="text1">
          <img className="start-icon1" alt="" src="/start.svg" />
          <div className="living-room9">Hallway 1</div>
        </div>
        <div className="icons5">
          <img className="start-icon1" alt="" src="/pen1.svg" />
        </div>
      </div>
      <div className="pause">
        <img className="start-icon2" alt="" src="/start1.svg" />
      </div>
    </div>
  );
};

export default Hallway1Container;
