import { FunctionComponent, memo } from 'react'
import '../styles/compo/UserAccount.css'
import AdminFormContainer from './AdminFormContainer'
import SubmitButton from './SubmitButton'
import Passwordss from '../../public/password.svg'
import Pen from '../../public/pen.svg'
import Pen2 from '../../public/pen2.svg'
import Vector2 from '../../public/vector2.svg'



type UserAccountType = {
  onClose?: () => void
}

const UserAccount: FunctionComponent<UserAccountType> = memo(() => {
  function onSaveContainerClick(): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="user-account">
      <div className="alert">
        <div className="icongroup">
          <div className="sneak">
            <img className="pen-icon" alt="" src={Pen} />
          </div>
          <div className="lessgo-we-on">User account</div>
        </div>
        <div className="input">
        <AdminFormContainer title="Name" type="text" placeholder="René Dupuis" icon={Pen2} />{' '}
        
          <AdminFormContainer title="Email" type="email" placeholder="rene.dupuis@gmail.com" icon={Vector2} />
          <AdminFormContainer
                title="Password"
                type="password"
                placeholder="*****************"
                icon={Passwordss}
              />
              <SubmitButton onClick={onSaveContainerClick} text="Save" />
        </div>

      </div>
    </div>
  )
})

export default UserAccount
