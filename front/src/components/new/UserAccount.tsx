import { FunctionComponent, memo } from "react";
import "../styles/compo/UserAccount.css";

type UserAccountType = {
  onClose?: () => void;
};

const UserAccount: FunctionComponent<UserAccountType> = memo(({ onClose }) => {
  return (
    <div className="user-account">
      <div className="alert">
        <div className="nameclosecontainer">
          <div className="icongroup">
            <div className="sneak">
              <img className="pen-icon" alt="" src="/pen.svg" />
            </div>
            <div className="lessgo-we-on">User account</div>
          </div>
          <img className="pen-icon" alt="" src="/vector.svg" />
        </div>
        <div className="input">
          <div className="login">Email</div>
          <div className="logging-in-will">
            Logging in will help you access actions such as viewing video feeds.
            To log in, please enter your username below.
          </div>
          <div className="input1">
            <div className="lessgo-we-on">charlus@perrus.com</div>
            <div className="magnifyingglass">
              <div className="magnifyingglass1">
                <img className="vector-icon1" alt="" src="/vector1.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="input">
          <div className="login">Password</div>
          <div className="logging-in-will">
            Logging in will help you access actions such as viewing video feeds.
            To log in, please enter your username below.
          </div>
          <div className="input1">
            <div className="lessgo-we-on">********************</div>
            <div className="magnifyingglass">
              <div className="magnifyingglass1">
                <img className="vector-icon1" alt="" src="/vector1.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="input">
          <div className="login">Password 2: Electric Boogaloo</div>
          <div className="logging-in-will2">
            Please type your password a second time so you can make sure to have
            typed it right.
          </div>
          <div className="input1">
            <div className="lessgo-we-on">********************</div>
            <div className="magnifyingglass">
              <div className="magnifyingglass1">
                <img className="vector-icon1" alt="" src="/vector1.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="label">
          <div className="text">
            <img className="pause-icon" alt="" src="/pause.svg" />
            <div className="permissions">Permissions</div>
          </div>
        </div>
        <div className="checkbox">
          <div className="frame-parent">
            <div className="rectangle-wrapper">
              <div className="frame-child" />
            </div>
            <div className="lessgo-we-on">Checkbox</div>
          </div>
        </div>
        <div className="checkbox">
          <div className="frame-parent">
            <div className="rectangle-wrapper">
              <div className="frame-child" />
            </div>
            <div className="lessgo-we-on">Checkbox</div>
          </div>
        </div>
        <div className="checkbox">
          <div className="frame-parent">
            <div className="rectangle-wrapper">
              <div className="frame-child" />
            </div>
            <div className="lessgo-we-on">Checkbox</div>
          </div>
        </div>
        <div className="buttoncontainer">
          <div className="button">
            <b className="lessgo-we-on">Save</b>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserAccount;
