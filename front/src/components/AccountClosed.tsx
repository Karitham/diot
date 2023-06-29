import { useCallback, useState } from 'react'
import SubmitButton from './SubmitButton'
import MyAccount from './MyAccount'
import { useNavigate } from 'react-router-dom'
import { Account } from './UserAccount'
import { client } from '../api/client'

const AccountClosed = (props: { account: Account; refresh: () => void }) => {
  const [showEditComponent, setShowEditComponent] = useState(false)

  const handleEditContainerClick = () => {
    setShowEditComponent(true)
  }

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

  const onSaveContainerClick = useCallback(() => {
    navigate('/adminpanel')
  }, [navigate])

  const onDeleteContainerClick = useCallback(() => {
    deleteUserAccount(props.account.id!).then(() => props.refresh())
  }, [navigate])

  if (showEditComponent) {
    return (
      <MyAccount
        account={props.account}
        options={options}
        selectedValues={selectedValues}
        handleDropdownChange={handleDropdownChange}
        onDeleteContainerClick={onDeleteContainerClick}
        onSaveContainerClick={onSaveContainerClick}
      />
    )
  }

  return (
    <div className="account-closed">
      <div className="xavier-thellier">{props.account.name}</div>
      <SubmitButton onClick={handleEditContainerClick} text="Edit" />
    </div>
  )
}

export default AccountClosed

const deleteUserAccount = async (id: string) => {
  const resp = await client.del(`/users/{id}`, {
    params: {
      path: {
        id: id
      }
    }
  })
  return resp
}
