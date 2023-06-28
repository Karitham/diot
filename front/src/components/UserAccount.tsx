import { FunctionComponent, memo } from 'react'
import '../styles/compo/UserAccount.css'
import AdminFormContainer from './AdminFormContainer'
import SubmitButton from './SubmitButton'

type UserAccountType = {
  onClose?: () => void
}

const UserAccount: FunctionComponent<UserAccountType> = memo(({}) => {
  function onSaveContainerClick(): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="user-account">
      <div className="alert">
        <div className="icongroup">
          <div className="sneak">
            <img className="pen-icon" alt="" src="/pen.svg" />
          </div>
          <div className="lessgo-we-on">User account</div>
        </div>
        <div className="input">
          <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon={<img src="/pen2.svg"></img>} />
          <AdminFormContainer
            title="Email"
            type="email"
            placeholder="rene.dupuis@gmail.com"
            icon={<img src="/vector2.svg"></img>}
          />
          <AdminFormContainer
            title="Password"
            type="password"
            placeholder="*****************"
            icon={<img src="/password.svg"></img>}
          />
          <SubmitButton onClick={onSaveContainerClick} text="Save" />
        </div>
      </div>
    </div>
  )
})

export default UserAccount
