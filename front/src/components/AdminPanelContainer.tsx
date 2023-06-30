import { FunctionComponent, memo } from 'react'
import '../styles/compo/AdminPanelContainer.css'
import AccountClosed from './AccountClosed'
import { Account } from './UserAccount'

export type AdminPanelContainerProps = {
  accounts: Account[]
  refresh: () => void
}

const AdminPanelContainer: FunctionComponent<AdminPanelContainerProps> = memo((props: AdminPanelContainerProps) => {
  return (
    <div className="users">
      <div className="users1">Users</div>
      <div className="accounts">
        {props.accounts.map((a, index) => (
          <AccountClosed key={index} account={a} refresh={props.refresh} />
        ))}
      </div>
    </div>
  )
})

export default AdminPanelContainer
