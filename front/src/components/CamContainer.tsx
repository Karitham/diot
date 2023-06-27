import { useCallback, useState } from 'react'
import '../styles/compo/CamContainer.css'
import EditComponent from './EditComponent'
import PortalPopup from './PortalPopup'

export type CamContainerType = {
  id: string
  label: string
  url: string

  alert?: boolean
  disabled?: boolean
  fullwidth?: boolean
}

const CamContainer = (props: CamContainerType) => {
  const [isEditComponentOpen, setEditComponentOpen] = useState(false)

  const openEditComponent = useCallback(() => {
    setEditComponentOpen(true)
  }, [])

  const closeEditComponent = useCallback(() => {
    setEditComponentOpen(false)
  }, [])

  const Cam = () =>
    props.disabled ? (
      <div className="video disabled">
        <div className="disabled-text">
          <img className="disabled-icon" alt="" src="/start.svg" />
        </div>
      </div>
    ) : (
      <img
        className="video"
        alt=""
        src={props.url}
        style={{
          borderTop: props.alert ? '10px solid var(--colors-red)' : 'none'
        }}
      />
    )

  return (
    <>
      <div className={`cam-container ${props.fullwidth ? 'full-width' : ''} ${props.disabled ? 'disabled' : ''}`}>
        <div className="label">
          <div className="label-text">
            <img className="label-text-icon" alt="" src="/pause1.svg" />
            <div className="label-title">{props.label}</div>
          </div>
          <div className="label-icons">
            <img className="label-icon" alt="" src="/pen3.svg" onClick={openEditComponent} />
          </div>
        </div>
        <Cam />
      </div>
      {isEditComponentOpen && (
        <PortalPopup overlayColor="rgba(113, 113, 113, 0.3)" placement="Centered" onOutsideClick={closeEditComponent}>
          <EditComponent onClose={closeEditComponent} />
        </PortalPopup>
      )}
    </>
  )
}

export default CamContainer
