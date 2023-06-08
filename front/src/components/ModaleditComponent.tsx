import { FunctionComponent } from 'react'
import LivingRoomContainer from './LivingRoomContainer'
import '../styles/compo/ModaleditComponent.css'

type ModaleditComponentType = {
  onClose?: () => void
}

const ModaleditComponent: FunctionComponent<ModaleditComponentType> = (props: ModaleditComponentType) => {
  return (
    <div className="modaledit-component">
      <div className="alert7">
        <div className="nameclosecontainer">
          <div className="icongroup45">
            <div className="sneak9">
              <img className="pen-icon1" alt="" src="/pen3.svg" />
            </div>
            <div className="click-me">Living room</div>
          </div>
          <img className="pen-icon1" alt="" src="/vector8.svg" />
        </div>
        <LivingRoomContainer />
        <div className="buttoncontainer" onClick={props.onClose}>
          <div className="button">
            <b className="click-me">Save</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModaleditComponent
