import { FunctionComponent, memo } from "react";
import "../styles/compo/AdminPanelContainer.css";
const AdminPanelContainer: FunctionComponent = memo(() => {
  return (
    <div className="users">
      <div className="users1">Users</div>
      <div className="accounts">
        <div className="my-account">
          <div className="charles-perrard">My account</div>
          <div className="fields">
            <div className="select">
              <div className="login6">Name</div>
              <div className="logging-in-will4">
                Logging in will help you access actions such as viewing video
                feeds. To log in, please enter your username below.
              </div>
              <div className="input11">
                <div className="select-permissions">Charles Perrard</div>
                <div className="magnifyingglass11">
                  <img className="pen-icon3" alt="" src="/pen2.svg" />
                </div>
              </div>
            </div>
            <div className="select">
              <div className="login6">Email</div>
              <div className="logging-in-will4">
                Logging in will help you access actions such as viewing video
                feeds. To log in, please enter your username below.
              </div>
              <div className="input11">
                <div className="select-permissions">
                  charles.perrard@viacesi.fr
                </div>
                <div className="magnifyingglass11">
                  <div className="mail1">
                    <img className="vector-icon16" alt="" src="/vector2.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="select">
              <div className="login6">Password</div>
              <div className="logging-in-will4">
                Logging in will help you access actions such as viewing video
                feeds. To log in, please enter your username below.
              </div>
              <div className="input11">
                <div className="select-permissions">*****************</div>
                <div className="magnifyingglass11">
                  <img className="password-icon1" alt="" src="/password.svg" />
                </div>
              </div>
            </div>
            <div className="select">
              <div className="login6">Permissions</div>
              <div className="permissions-allow-you">
                Permissions allow you to configure what action a user is able to
                accomplish.
              </div>
              <div className="input11">
                <div className="select-permissions">Select permissions</div>
                <div className="down1">
                  <img className="vector-icon17" alt="" src="/vector3.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="buttonblock">
            <div className="button3">
              <b className="select-permissions">Delete</b>
            </div>
            <div className="button4">
              <b className="select-permissions">Edit</b>
            </div>
          </div>
        </div>
        <div className="account-closed">
          <div className="xavier-thellier">Xavier Thellier</div>
          <div className="button5">
            <b className="select-permissions">Edit</b>
          </div>
        </div>
        <div className="my-account">
          <div className="charles-perrard">Charles Perrard</div>
          <div className="fields1">
            <div className="select">
              <div className="login9">Name</div>
              <div className="logging-in-will7">
                Logging in will help you access actions such as viewing video
                feeds. To log in, please enter your username below.
              </div>
              <div className="input18">
                <div className="select-permissions">Charles Perrard</div>
                <div className="magnifyingglass11">
                  <img className="pen-icon3" alt="" src="/pen3.svg" />
                </div>
              </div>
            </div>
            <div className="select">
              <div className="login9">Permissions</div>
              <div className="permissions-allow-you1">
                Permissions allow you to configure what action a user is able to
                accomplish.
              </div>
              <div className="dropdown">
                <div className="input19">
                  <div className="select-permissions">Select permissions</div>
                  <div className="down2">
                    <img className="vector-icon17" alt="" src="/vector4.svg" />
                  </div>
                </div>
                <div className="options">
                  <div className="options1">
                    <div className="select-permissions">View cameras</div>
                    <div className="permissions-allow-you2">
                      Permissions allow you to configure what action a user is
                      able to accomplish.
                    </div>
                  </div>
                  <div className="options2">
                    <div className="select-permissions">
                      Disable all cameras
                    </div>
                    <div className="permissions-allow-you3">
                      Disabling all cameras mean that we will be unable to
                      detect intrusions. You will have to re-enable it later.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="buttonblock">
            <div className="button6">
              <b className="select-permissions">Delete</b>
            </div>
            <div className="button4">
              <b className="select-permissions">Save</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminPanelContainer;
