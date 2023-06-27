import { FunctionComponent, memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/compo/AdminPanelContainer.css'
import AdminFormContainer from './AdminFormContainer'
import MultiSelectDropdown from './MultiSelectDropdown'
import SubmitButton from './SubmitButton'
//import DeleteButton from './DeleteButton'
import AccountClosed from './AccountClosed'
//import MyAccount from './MyAccount'
import Passwordss from '../../public/password.svg'
import Pen2 from '../../public/pen2.svg'
import Vector2 from '../../public/vector2.svg'




const account1 = {
  name: "Charles Perrard"
}
const account2 = {
  name: "Pierre-Louis Pery"
}

const accounts = [account1, account2]

const AdminPanelContainer: FunctionComponent = memo(() => {
  const options = [
    { value: 'option1', label: 'View cameras' },
    { value: 'option2', label: 'Disable all cameras' },
    { value: 'option3', label: 'Option 3' }
  ]

  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleDropdownChange = (selectedValues: string[]) => {
    setSelectedValues(selectedValues)
  }

  const navigate = useNavigate()

  const onEditContainerClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  return (
    <div className="users">
      <div className="users1">Users</div>
      <div className="accounts">
        <div className="my-account">
          <div className="charles-perrard">Me</div>
          <div className="fields">
            <div className="select">
              <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon={Pen2} />
            </div>
            <div className="select">
              <AdminFormContainer title="Email" type="email" placeholder="rene.dupuis@gmail.com" icon={Vector2} />
            </div>
            <div className="select">
              <AdminFormContainer
                title="Password"
                type="password"
                placeholder="*****************"
                icon={Passwordss}
              />
            </div>
            <div className="select">
              <div className="login6">Permissions</div>
              <div className="permissions-allow-you">
                Permissions allow you to configure what action a user is able to accomplish.
              </div>
              <div className="">
                <MultiSelectDropdown
                  options={options}
                  selectedValues={selectedValues}
                  onChange={handleDropdownChange}
                  closedLabel="Click here to select permissions"
                />
              </div>
            </div>
          </div>
          <div className="buttonblock">
            <SubmitButton onClick={onEditContainerClick} text="Save" />
          </div>
        </div>
        {accounts.map(a => (
          <AccountClosed name={a.name} />
        ))}
      </div>
    </div>
  )
})

export default AdminPanelContainer
