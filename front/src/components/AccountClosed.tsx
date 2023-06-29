import { useCallback, useState } from 'react'
import SubmitButton from './SubmitButton'
import MyAccount from './MyAccount'
import { useNavigate } from 'react-router-dom'
import { Account } from './UserAccount'
import { client } from '../api/client'

export const permissionOptions = [
  { value: 'perm', label: 'admin' },
  { value: 'perm:users:create', label: 'create users' },
  { value: 'perm:users:read', label: 'read users' },
  { value: 'perm:users:delete', label: 'delete users' },
  { value: 'perm:alerts:read', label: 'read alerts' },
  { value: 'perm:sensors:read', label: 'read sensors' },
  { value: 'perm:sensors:update', label: 'update sensors' },
  { value: 'perm:sensors:delete', label: 'delete sensors' },
  { value: 'perm:sensors:state:update', label: 'update sensors state' }
]

const AccountClosed = (props: { account: Account; refresh: () => void }) => {
  const [showEditComponent, setShowEditComponent] = useState(false)

  const handleEditContainerClick = () => {
    setShowEditComponent(true)
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
        options={permissionOptions}
        selectedValues={props.account.permissions}
        handleDropdownChange={p => (props.account.permissions = p)}
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
