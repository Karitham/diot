import { FunctionComponent } from 'react'
import AdminFormContainer from './AdminFormContainer'
import MultiSelectDropdown from './MultiSelectDropdown'
import DeleteButton from './DeleteButton'
import SubmitButton from './SubmitButton'
import { Account } from './UserAccount'

interface MyAccountProps {
  account: Account
  options: { value: string; label: string }[]
  selectedValues: string[]
  handleDropdownChange: (selectedValues: string[]) => void
  onDeleteContainerClick: () => void
  onSaveContainerClick: (acc: Account) => void
}

const MyAccount: FunctionComponent<MyAccountProps> = ({
  account,
  options,
  handleDropdownChange,
  onDeleteContainerClick,
  onSaveContainerClick
}) => {
  return (
    <div className="my-account">
      <div className="charles-perrard">{account.name}</div>
      <div className="fields">
        <div className="select">
          <AdminFormContainer
            title="Name"
            type="text"
            value={account.name}
            placeholder="René Dupuis"
            icon={<img src="/pen2.svg" alt="pen" />}
          />
        </div>
        <div className="select">
          <AdminFormContainer
            title="Email"
            type="text"
            value={account.email}
            placeholder="René Dupuis"
            icon={<img src="/pen2.svg" alt="pen" />}
          />
        </div>
        <div className="select">
          <div className="login6">Permissions</div>
          <div className="permissions-allow-you">
            Permissions allow you to configure what action a user is able to accomplish.
          </div>
          <MultiSelectDropdown
            options={options}
            selectedValues={account.permissions}
            onChange={handleDropdownChange}
            closedLabel="Click here to select permissions"
          />
          <div className="permissions-allow-you2">
            Permissions allow you to configure what action a user is able to accomplish.
          </div>
        </div>
      </div>
      <div className="buttonblock">
        <DeleteButton onClick={onDeleteContainerClick} text="Delete" />
        <SubmitButton onClick={() => onSaveContainerClick(account)} text="Save" />
      </div>
    </div>
  )
}

export default MyAccount
