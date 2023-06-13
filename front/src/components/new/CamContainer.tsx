import { FunctionComponent, memo, useState, useMemo, useCallback } from "react";
import EditComponent from "./EditComponent";
import PortalPopup from "./PortalPopup";
import CSS, { Property } from "csstype";
import "../styles/compo/CamContainer.css";

type CamContainerType = {
  roomName?: string;
  roomImageId?: string;

  /** Style props */
  propHeight?: Property.Height;
};

const CamContainer: FunctionComponent<CamContainerType> = memo(
  ({ roomName, roomImageId, propHeight }) => {
    const [isEditComponentOpen, setEditComponentOpen] = useState(false);
    const livingroomIconStyle: CSS.Properties = useMemo(() => {
      return {
        height: propHeight,
      };
    }, [propHeight]);

    const openEditComponent = useCallback(() => {
      setEditComponentOpen(true);
    }, []);

    const closeEditComponent = useCallback(() => {
      setEditComponentOpen(false);
    }, []);

    return (
      <>
        <div className="cam">
          <div className="label5">
            <div className="text5">
              <img className="pause-icon3" alt="" src="/pause2.svg" />
              <div className="living-room2">{roomName}</div>
            </div>
            <div className="icons4">
              <img
                className="pen-icon5"
                alt=""
                src="/pen4.svg"
                onClick={openEditComponent}
              />
            </div>
          </div>
          <img
            className="livingroom-icon"
            alt=""
            src={roomImageId}
            style={livingroomIconStyle}
          />
        </div>
        {isEditComponentOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeEditComponent}
          >
            <EditComponent onClose={closeEditComponent} />
          </PortalPopup>
        )}
      </>
    );
  }
);

export default CamContainer;
