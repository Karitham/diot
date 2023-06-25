import { FunctionComponent, memo, useCallback } from "react";
import CamModifyModal from "./CamModifyModal";
import SubmitButton from "./SubmitButton";
import "../styles/compo/EditComponent.css";
import { useNavigate } from "react-router-dom";

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
            <img className="pen-icon1" alt="" src="/pen1.svg" />
          </div>
          <div className="living-room">Living room</div>
        </div>
        <div>
          <img className="pen-icon1" alt="" src="/vector8.svg" onClick={handleImageClick} />
        </div>
      </div>
      <CamModifyModal />
      <SubmitButton onClick={onSaveContainerClick} text="Save" />
    </div>
  );
});

export default EditComponent;
