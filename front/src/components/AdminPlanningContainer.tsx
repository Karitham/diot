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

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const AdminPlanningContainer: FunctionComponent = memo(() => {
  const [startDay, setStartDay] = useState(days[0])
  const [endDay, setEndDay] = useState(days[4])
  const [startTime, setStartTime] = useState('07:00')
  const [endTime, setEndTime] = useState('18:00')

  const handleStartDaySelection = (selectedDay: string) => setStartDay(selectedDay)
  const handleEndDaySelection = (selectedDay: string) => setEndDay(selectedDay)

  const onResetClick = () => {
    setStartDay(days[0])
    setEndDay(days[4])
  }

  const handleStartTimeChange = (value: string) => setStartTime(value)
  const handleEndTimeChange = (value: string) => setEndTime(value)

  // disable from monday 7:00
  const dayDisableStart = (currentDay: string, startDay: string, startTime: string): number => {
    // if we are after the start day or now is the start day
    if (days.indexOf(currentDay) >= days.indexOf(startDay)) {
      return parseT(startTime) // number of minutes from 00:00 to startTime
    }

    return parseT(endTime) // number of minutes from 00:00 to endTime
  }

  const parseT = (t: string): number => {
    const [hours, minutes] = t.split(':')
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10)
  }

  // disable from friday 18:00
  const dayDisableEnd = (currentDay: string, endDay: string, endTime: string): number => {
    // if we are before the end day or now is the end day
    if (days.indexOf(currentDay) <= days.indexOf(endDay)) {
      return parseT(endTime)
    }

    return parseT(startTime)
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
              <MondayComponent
                dayOfWeek="Monday"
                disabledEnd={dayDisableEnd('Monday', endDay, endTime)}
                disabledStart={dayDisableStart('Monday', startDay, startTime)}
              />
              <MondayComponent
                dayOfWeek="Tuesday"
                disabledEnd={dayDisableEnd('Tuesday', endDay, endTime)}
                disabledStart={dayDisableStart('Tuesday', startDay, startTime)}
              />
              <MondayComponent
                dayOfWeek="Wednesday"
                disabledEnd={dayDisableEnd('Tuesday', endDay, endTime)}
                disabledStart={dayDisableStart('Wednesday', startDay, startTime)}
              />
              <MondayComponent
                dayOfWeek="Thursday"
                disabledEnd={dayDisableEnd('Thursday', endDay, endTime)}
                disabledStart={dayDisableStart('Thursday', startDay, startTime)}
              />
              <MondayComponent
                dayOfWeek="Friday"
                disabledEnd={dayDisableEnd('Friday', endDay, endTime)}
                disabledStart={dayDisableStart('Friday', startDay, startTime)}
              />
              <MondayComponent
                dayOfWeek="Saturday"
                disabledEnd={dayDisableEnd('Saturday', endDay, endTime)}
                disabledStart={dayDisableStart('Saturday', startDay, startTime)}
              />
              <MondayComponent
                dayOfWeek="Sunday"
                disabledEnd={dayDisableEnd('Sunday', endDay, endTime)}
                disabledStart={dayDisableStart('Sunday', startDay, startTime)}
              />
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
                    icon="/calendar.svg"
                  />
                  <AdminDayContainer
                    name="End Day"
                    value={endDay}
                    onInput={handleEndDaySelection}
                    icon="/calendar.svg"
                  />
                  <div className="button1s" onClick={onResetClick}>
                    <img className="vector-icon6s" alt="" src="/vector10.svg" />
                  </div>
                </div>
                <div className="selects">
                  <AdminHoursContainer name="Start" value={startTime} onInput={handleStartTimeChange} />
                  <AdminHoursContainer name="End" value={endTime} onInput={handleEndTimeChange} />
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
