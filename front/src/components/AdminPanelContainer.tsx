import { FunctionComponent, memo, useCallback, useState } from 'react'
import '../styles/compo/AdminPanelContainer.css'
import AdminFormContainer from './AdminFormContainer'
import MultiSelectDropdown from './MultiSelectDropdown'
import SubmitButton from './SubmitButton'
import DeleteButton from './DeleteButton'
import { useNavigate } from 'react-router-dom'

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

  const onSaveContainerClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  const onDeleteContainerClick = useCallback(() => {
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
              <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon="/pen2.svg" />
            </div>
            <div className="select">
              <AdminFormContainer title="Email" type="email" placeholder="rene.dupuis@gmail.com" icon="/vector2.svg" />
            </div>
            <div className="select">
              <AdminFormContainer
                title="Password"
                type="password"
                placeholder="*****************"
                icon="/password.svg"
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
              <div className="permissions-allow-you2">
                Permissions allow you to configure what action a user is able to accomplish.
              </div>
            </div>
          </div>
          <div className="buttonblock">
            <SubmitButton onClick={onEditContainerClick} text="Edit" />
          </div>
        </div>
        <div className="account-closed">
          <div className="xavier-thellier">Charles Perrard</div>
          <SubmitButton onClick={onEditContainerClick} text="Edit" />
        </div>
        <div className="my-account">
          <div className="charles-perrard">Charles Perrard</div>
          <div className="fields">
            <div className="select">
              <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon="/pen2.svg" />
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
              <div className="permissions-allow-you2">
                Permissions allow you to configure what action a user is able to accomplish.
              </div>
            </div>
          </div>
          <div className="buttonblock">
            <DeleteButton onClick={onDeleteContainerClick} text="Delete" />
            <SubmitButton onClick={onSaveContainerClick} text="Save" />
          </div>
        </div>
      </div>
    </div>
  )
})

export default AdminPanelContainer
