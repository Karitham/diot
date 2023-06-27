import { FunctionComponent, memo } from "react";
import "../styles/compo/CamModifyModal.css";
import AdminFormContainer from "./AdminFormContainer";
import Pen2 from '../../public/pen2.svg'


const CamModifyModal: FunctionComponent = memo(() => {
  return (
    <div className="properties">
      <div className="input6">
      <AdminFormContainer title="Name" type="text" placeholder="Living room" icon={Pen2} />
      </div>
    </div>
  );
});

export default CamModifyModal;
