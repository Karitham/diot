import { FunctionComponent } from "react";
import "../styles/compo/LivingRoomContainer.css";
const LivingRoomContainer: FunctionComponent = () => {
  return (
    <div className="properties16">
      <div className="input1">
        <div className="login1">Name</div>
        <div className="logging-in-will">
          Logging in will help you access actions such as viewing video feeds.
          To log in, please enter your username below.
        </div>
        <div className="input2">
          <div className="lessgo-we-on">Living room</div>
          <div className="magnifyingglass1">
            <img className="vector-icon16" alt="" src="/vector7.svg" />
          </div>
        </div>
      </div>
      <div className="input3">
        <div className="login1">Schedule</div>
        <div className="logging-in-will-container">
          <span>{`The schedule below follows the cron syntax. To learn more about this syntax, check out `}</span>
          <span className="this-documentation">this documentation</span>
          <span>.</span>
        </div>
        <div className="input2">
          <div className="lessgo-we-on">* * * * *</div>
          <div className="magnifyingglass1">
            <img className="vector-icon16" alt="" src="/vector7.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingRoomContainer;
