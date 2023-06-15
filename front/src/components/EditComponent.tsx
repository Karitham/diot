import { FunctionComponent, memo } from "react";
import CamModifyModal from "./CamModifyModal";
import "../styles/compo/EditComponent.css";

type EditComponentType = {
  onClose?: () => void;
};

const EditComponent: FunctionComponent<EditComponentType> = memo(
  ({ onClose }) => {
    return (
      <div className="edit-component">
        <div className="nameclosecontainer1">
          <div className="icongroup1">
            <div className="sneak1">
              <img className="pen-icon1" alt="" src="/pen1.svg" />
            </div>
            <div className="living-room">Living room</div>
          </div>
          <img className="pen-icon1" alt="" src="/vector.svg" />
        </div>
        <CamModifyModal />
        <div className="buttoncontainer1">
          <div className="button1">
            <b className="living-room">Save</b>
          </div>
        </div>
      </div>
    );
  }
);

export default EditComponent;
