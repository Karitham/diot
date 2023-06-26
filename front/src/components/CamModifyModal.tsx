import { FunctionComponent, memo } from "react";
import "../styles/compo/CamModifyModal.css";
import AdminFormContainer from "./AdminFormContainer";

const CamModifyModal: FunctionComponent = memo(() => {
  return (
    <div className="properties">
      <div className="input6">
      <AdminFormContainer title="Name" type="text" placeholder="Living room" icon="/pen2.svg" />
      </div>
    </div>
  );
});

export default CamModifyModal;
