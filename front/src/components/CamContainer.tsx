import { FunctionComponent, useState, useMemo, useCallback } from "react";
import ModaleditComponent from "./ModaleditComponent";
import PortalPopup from "./PortalPopup";
import CSS, { Property } from "csstype";
import "../styles/compo/CamContainer.css";

type CamContainerType = {
  roomName?: string;
  roomImageUrl?: string;

  /** Style props */
  propHeight?: Property.Height;
};

const CamContainer: FunctionComponent<CamContainerType> = ({
  roomName,
  roomImageUrl,
  propHeight,
}) => {
  const [isModaleditComponentOpen, setModaleditComponentOpen] = useState(false);
  const livingroomIconStyle: CSS.Properties = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const openModaleditComponent = useCallback(() => {
    setModaleditComponentOpen(true);
  }, []);

  const closeModaleditComponent = useCallback(() => {
    setModaleditComponentOpen(false);
  }, []);

  return (
    <>
      <div className="cam">
        <div className="label">
          <div className="text">
            <img className="pause-icon1" alt="" src="/pause.svg" />
            <div className="living-room8">{roomName}</div>
          </div>
          <div className="icons4">
            <img
              className="pen-icon2"
              alt=""
              src="/pen.svg"
              onClick={openModaleditComponent}
            />
          </div>
        </div>
        <img
          className="livingroom-icon"
          alt=""
          src={roomImageUrl}
          style={livingroomIconStyle}
        />
      </div>
      {isModaleditComponentOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeModaleditComponent}
        >
          <ModaleditComponent onClose={closeModaleditComponent} />
        </PortalPopup>
      )}
    </>
  );
};

export default CamContainer;
