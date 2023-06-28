import { FunctionComponent, memo, useState } from 'react'
import '../styles/compo/UserAccount.css'
import AdminFormContainer from './AdminFormContainer'
import SubmitButton from './SubmitButton'

export type UserAccountType = {
  onClose?: () => void
  onAccountSave?: (account: AccountType) => void // Nouvelle prop pour sauvegarder le compte
}

type AccountType = {
  name: string
}

const UserAccount: FunctionComponent<UserAccountType> = memo(({ onAccountSave }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSaveContainerClick(): void {
    // Créer un nouvel objet Account avec les données saisies
    const newAccount: AccountType = {
      name: name
    }

    // Appeler la fonction de sauvegarde du compte avec le nouvel objet Account
    if (onAccountSave) {
      onAccountSave(newAccount)
    }

    // Réinitialiser les champs du formulaire
    setName('')
    setEmail('')
    setPassword('')
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
            icon="/pen2.svg"
            value={name}
            onInput={setName}
          />
          <AdminFormContainer
            title="Email"
            type="email"
            placeholder="rene.dupuis@gmail.com"
            icon="/vector2.svg"
            value={email}
            onInput={setEmail}
          />
          <AdminFormContainer
            title="Password"
            type="password"
            placeholder="*****************"
            icon="/password.svg"
            value={password}
            onInput={setPassword}
          />
          <SubmitButton onClick={onSaveContainerClick} text="Save" />
        </div>
      </div>
    </div>
  )
})

export default UserAccount
