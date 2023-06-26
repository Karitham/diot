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
        <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon="/pen2.svg" />{' '}
        
          <AdminFormContainer title="Email" type="email" placeholder="rene.dupuis@gmail.com" icon="/vector2.svg" />
          <AdminFormContainer
                title="Password"
                type="password"
                placeholder="*****************"
                icon="/password.svg"
              />
              <SubmitButton onClick={onSaveContainerClick} text="Save" />
        </div>

      </div>
    </div>
  )
})

export default UserAccount
