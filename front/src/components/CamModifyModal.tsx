import { FunctionComponent, memo } from "react";
import "../styles/compo/CamModifyModal.css";
const CamModifyModal: FunctionComponent = memo(() => {
  return (
    <div className="properties">
      <div className="input6">
        <div className="login4">Name</div>
        <div className="logging-in-will3">
          Logging in will help you access actions such as viewing video feeds.
          To log in, please enter your username below.
        </div>
        <div className="input7">
          <div className="lessgo-we-on3">Living room</div>
          <div className="magnifyingglass7">
            <div className="magnifyingglass8">
              <img className="vector-icon14" alt="" src="/vector1.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className="input6">
        <div className="login4">Schedule</div>
        <div className="logging-in-will-container">
          <span>{`The schedule below follows the cron syntax. To learn more about this syntax, check out `}</span>
          <span className="this-documentation">this documentation</span>
          <span>.</span>
        </div>
        <div className="input7">
          <div className="lessgo-we-on3">* * * * *</div>
          <div className="magnifyingglass7">
            <div className="magnifyingglass8">
              <img className="vector-icon14" alt="" src="/vector1.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CamModifyModal;
