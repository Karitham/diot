import { FunctionComponent, memo, useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/compo/AdminPlanningContainer.css'
//import AdminFormContainer from './AdminFormContainer'
//import MultiSelectDropdown from './MultiSelectDropdown'
//import SubmitButton from './SubmitButton'
//import AccountClosed from './AccountClosed'
import MondayComponent from './WeekBar'
//import SubmitButton from './SubmitButton'
import AdminDayContainer from './AdminDayContainer'

const AdminPlanningContainer: FunctionComponent = memo(() => {
  const navigate = useNavigate()

  const [selectedDay, setSelectedDay] = useState("");

  const handleDaySelection = (selectedDay: string) => {
    setSelectedDay(selectedDay);
  }

  const onEditContainerClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  return (
    <div className="users">
      <div className="users1">Planning</div>
      <div className="accountss">
        <div className="my-accounts">
          <div className="previews">
            <div className="devicess">
              <div className="configurations">Preview</div>
              <div className="preview-the-dayss">Preview the days it’s on</div>
            </div>
            <div className="instance-parents">
              <MondayComponent dayOfWeek="Monday" />
              <MondayComponent dayOfWeek="Tuesday" />
              <MondayComponent dayOfWeek="Wednesday" />
              <MondayComponent dayOfWeek="Thursday" />
              <MondayComponent dayOfWeek="Friday" />
              <MondayComponent dayOfWeek="Saturday" />
              <MondayComponent dayOfWeek="Sunday" />
            </div>
          </div>
          <div className="fieldss">
            <div className="title1s">
              <div className="configurations">Configuration</div>
              <div className="preview-the-dayss">Configure the time of the day it’s desactivated</div>
            </div>
            <div className="planning-wrappers">
              <div className="planning9s">
                <div className="input-parents">
                  
                  <div className="input6s">
                    <div className="login3s">Start Day</div>
                    
                    <div className="input7s">
                    <AdminDayContainer
                      value={selectedDay}
                      onInput={handleDaySelection}
                      icon="path/to/icon"
                    />
                      <div className="magnifyingglass6s">
                        <div className="calendars">
                          <img className="vector-icon4s" alt="" src="/vector2.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="input6s">
                    <div className="login3s">End Day</div>
                    <div className="logging-in-will3s">
                      Logging in will help you access actions such as viewing video feeds. To log in, please enter your
                      username below.
                    </div>
                    <div className="input7s">
                      <div className="edits">Friday</div>
                      <div className="magnifyingglass6s">
                        <div className="calendars">
                          <img className="vector-icon4s" alt="" src="/vector2.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="button1s">
                    <img className="vector-icon6s" alt="" src="/vector10.svg" />
                  </div>
                </div>
                <div className="selects">
                  <div className="login3s">Start</div>
                  <div className="logging-in-will3s">
                    Logging in will help you access actions such as viewing video feeds. To log in, please enter your
                    username below.
                  </div>
                  <div className="input7s">
                    <div className="edits">6h30</div>
                    <div className="magnifyingglass6s">
                      <div className="clocks">
                        <img className="vector-icon4s" alt="" src="/vector4.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="selects">
                  <div className="login3s">End</div>
                  <div className="logging-in-will3s">
                    Logging in will help you access actions such as viewing video feeds. To log in, please enter your
                    username below.
                  </div>
                  <div className="input7s">
                    <div className="edits">19h00</div>
                    <div className="magnifyingglass6s">
                      <div className="clocks">
                        <img className="vector-icon4s" alt="" src="/vector4.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="new-users" onClick={onEditContainerClick}>
              <b className="edits">New ruleset</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default AdminPlanningContainer
