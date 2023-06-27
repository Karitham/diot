import { FunctionComponent, memo, useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import '../styles/compo/AdminPlanningContainer.css'
//import AdminFormContainer from './AdminFormContainer'
//import MultiSelectDropdown from './MultiSelectDropdown'
//import SubmitButton from './SubmitButton'
//import AccountClosed from './AccountClosed'
import MondayComponent from './WeekBar'
//import SubmitButton from './SubmitButton'
import AdminDayContainer from './AdminDayContainer'
import AdminHoursContainer from './AdminHoursContainer'
import Calendar from '../../public/calendar.svg'
import Vector10 from '../../public/vector10.svg'



const AdminPlanningContainer: FunctionComponent = memo(() => {

  const [startDay, setStartDay] = useState('')
  const [endDay, setEndDay] = useState('')

  const handleStartDaySelection = (selectedDay: string) => {
    setStartDay(selectedDay)
  }

  const handleEndDaySelection = (selectedDay: string) => {
    setEndDay(selectedDay)
  }

  const onResetClick = () => {
    setStartDay('') // Réinitialise la valeur du premier dropdown
    setEndDay('') // Réinitialise la valeur du deuxième dropdown
  }

  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleStartTimeChange = (value: string) => {
    setStartTime(value)
  }

  const handleEndTimeChange = (value: string) => {
    setEndTime(value)
  }

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
                  <AdminDayContainer
                    name="Start Day"
                    value={startDay}
                    onInput={handleStartDaySelection}
                    icon={Calendar}
                  />
                  <AdminDayContainer
                    name="End Day"
                    value={endDay}
                    onInput={handleEndDaySelection}
                    icon={Calendar}
                  />
                  <div className="button1s" onClick={onResetClick}>
                    <img className="vector-icon6s" alt="" src={Vector10} />
                  </div>
                </div>
                <div className="selects">
                  <AdminHoursContainer
                    name="Start"
                    value={startTime}
                    onInput={handleStartTimeChange}
                  />
                  <AdminHoursContainer
                    name="End"
                    value={endTime}
                    onInput={handleEndTimeChange}
                  />
                </div>
              </div>
            </div>
            {/* <div className="new-users" onClick={onEditContainerClick}>
  <b className="edits">New ruleset</b>
</div> */}
          </div>
        </div>
      </div>
    </div>
  )
})

export default AdminPlanningContainer
