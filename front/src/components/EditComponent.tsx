import { FunctionComponent, memo, useCallback, useState } from 'react'
import SubmitButton from './SubmitButton'
import '../styles/compo/EditComponent.css'
import { useNavigate } from 'react-router-dom'
import AdminFormContainer from './AdminFormContainer'

type EditModalProps = {
  onClose?: () => void
  content?: string
  label?: string
}

const EditComponent: FunctionComponent<EditModalProps> = memo((props: EditModalProps) => {
  const navigate = useNavigate()

  const [content, setContent] = useState<string>(props.content ?? '')

  const onSaveContainerClick = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  return (
    <div className="edit-component">
      <div className="nameclosecontainer1">
        <div className="icongroup1">
          <div className="sneak1">
            <img className="pen-icon1" alt="" src="/pen1.svg" />
          </div>
          <div className="living-room">{props.label ?? content}</div>
        </div>
        <div>
          <img className="pen-icon1" alt="" src="/vector8.svg" onClick={props.onClose} />
        </div>
      </div>
      <div className="properties">
        <div className="input6">
          <AdminFormContainer onInput={setContent} value={props.content} />
        </div>
      </div>
      <SubmitButton onClick={onSaveContainerClick} text="Save" />
    </div>
  )
})

export default EditComponent
