import { FunctionComponent, memo, useCallback } from "react";
import CamModifyModal from "./CamModifyModal";
import SubmitButton from "./SubmitButton";
import "../styles/compo/EditComponent.css";
import { useNavigate } from "react-router-dom";
import Pen1 from '../../public/pen1.svg'
import Vector8 from '../../public/vector8.svg'



type EditComponentType = {
  onClose?: () => void;
};

const EditComponent: FunctionComponent<EditComponentType> = memo(({ onClose }) => {
  const navigate = useNavigate();

  const onSaveContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const handleImageClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  

  return (
    <div className="edit-component">
      <div className="nameclosecontainer1">
        <div className="icongroup1">
          <div className="sneak1">
            <img className="pen-icon1" alt="" src={Pen1} />
          </div>
          <div className="living-room">Living room</div>
        </div>
        <div>
          <img className="pen-icon1" alt="" src={Vector8} onClick={handleImageClick} />
        </div>
      </div>
      <CamModifyModal />
      <SubmitButton onClick={onSaveContainerClick} text="Save" />
    </div>
  );
});

export default EditComponent;
