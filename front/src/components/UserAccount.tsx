import { FunctionComponent, memo, useState } from 'react'
import '../styles/compo/UserAccount.css'
import AdminFormContainer from './AdminFormContainer'
import SubmitButton from './SubmitButton'
import MultiSelectDropdown from './MultiSelectDropdown'
import { permissionOptions } from './AccountClosed'
import 'react-toastify/dist/ReactToastify.css'

export type UserAccountProps = {
  onClose?: () => void
  onAccountSave?: (account: Account) => void // Nouvelle prop pour sauvegarder le compte
}

export type Account = {
  id?: string
  name: string
  password?: string
  email: string
  permissions: string[]
}

const UserAccount: FunctionComponent<UserAccountProps> = memo(({ onAccountSave }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [permissions, setPermissions] = useState<string[]>([])

  function onSaveContainerClick(): void {
    // Appeler la fonction de sauvegarde du compte avec le nouvel objet Account
    if (onAccountSave) {
      onAccountSave({
        name: name,
        password: password,
        email: email,
        permissions: []
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
          <div className="select">
            <div className="select">
              <div className="login6">Permissions</div>
              <div className="permissions-allow-you">
                Permissions allow you to configure what action a user is able to accomplish.
              </div>
              <MultiSelectDropdown
                options={permissionOptions}
                selectedValues={permissions}
                onChange={setPermissions}
                closedLabel="Click here to select permissions"
              />
              <div className="permissions-allow-you2">
                Permissions allow you to configure what action a user is able to accomplish.
              </div>
            </div>
          </div>
        </div>
        <SubmitButton onClick={onSaveContainerClick} text="Save" toastMessage="Le bouton a été cliqué !" />
      </div>
    </div>
  )
})

export default UserAccount
