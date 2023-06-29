import { FunctionComponent, memo, useState } from 'react'
import '../styles/compo/UserAccount.css'
import AdminFormContainer from './AdminFormContainer'
import SubmitButton from './SubmitButton'

export type UserAccountProps = {
  onClose?: () => void
  onAccountSave?: (account: Account) => void // Nouvelle prop pour sauvegarder le compte
}

export type Account = {
  id?: string
  name: string
  password?: string
  email: string
}

const UserAccount: FunctionComponent<UserAccountProps> = memo(({ onAccountSave }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSaveContainerClick(): void {
    // Appeler la fonction de sauvegarde du compte avec le nouvel objet Account
    if (onAccountSave) {
      onAccountSave({
        name: name,
        password: password,
        email: email
      })
    }
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
          <AdminFormContainer
            title="Name"
            type="text"
            placeholder="René Dupuis"
            icon={<img src="/pen2.svg" />}
            onInput={e => setName(e.currentTarget.value)}
          />
          <AdminFormContainer
            title="Email"
            type="email"
            placeholder="rene.dupuis@gmail.com"
            icon={<img src="/vector2.svg" />}
            onInput={e => setEmail(e.currentTarget.value)}
          />
          <AdminFormContainer
            title="Password"
            type="password"
            placeholder="*****************"
            icon={<img src="/password.svg" />}
            onInput={e => setPassword(e.currentTarget.value)}
          />
          <SubmitButton onClick={onSaveContainerClick} text="Save" />
        </div>
      </div>
    </div>
  )
})

export default UserAccount
