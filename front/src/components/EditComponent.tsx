import { FunctionComponent, SVGProps, memo, useCallback, useState } from 'react'
import SubmitButton from './SubmitButton'
import '../styles/compo/EditComponent.css'
import { useNavigate } from 'react-router-dom'
import AdminFormContainer from './AdminFormContainer'
import 'react-toastify/dist/ReactToastify.css'


type EditModalProps = {
  onClose?: () => void
  onSave?: (content: string) => void
  content?: string
  label?: string
}

const EditComponent: FunctionComponent<EditModalProps> = memo((props: EditModalProps) => {
  const navigate = useNavigate()

  const [content, setContent] = useState<string>(props.content ?? '')

  const onSaveContainerClick = useCallback(() => {
    props.onSave?.(content)
    props.onClose?.()
    navigate('/dashboard')
  }, [navigate, props, content])

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
          <img className="pen-icon1 hover-effect-xl" alt="" src="/vector8.svg" onClick={props.onClose} />
        </div>
      </div>
      <div className="properties">
        <div className="input6">
          <AdminFormContainer onInput={e => setContent(e.currentTarget.value)} icon={<PhUserList></PhUserList>} />
        </div>
      </div>
      <SubmitButton onClick={onSaveContainerClick} text="Save" toastMessage="Saved"/>
    </div>
  )
})

export default EditComponent

function PhUserList(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M144 80a8 8 0 0 1 8-8h96a8 8 0 0 1 0 16h-96a8 8 0 0 1-8-8Zm104 40h-96a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16Zm0 48h-72a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16Zm-96.25 22a8 8 0 0 1-5.76 9.74a7.55 7.55 0 0 1-2 .26a8 8 0 0 1-7.75-6c-6.16-23.94-30.34-42-56.25-42s-50.09 18.05-56.25 42a8 8 0 0 1-15.5-4c5.59-21.71 21.84-39.29 42.46-48a48 48 0 1 1 58.58 0c20.63 8.71 36.88 26.29 42.47 48ZM80 136a32 32 0 1 0-32-32a32 32 0 0 0 32 32Z"></path>
    </svg>
  )
}
