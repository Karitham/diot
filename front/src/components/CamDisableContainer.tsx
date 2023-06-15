import { FunctionComponent, memo, useMemo } from "react";
import CSS, { Property } from "csstype";
import "../styles/compo/CamDisableContainer.css";

type CamDisableContainerType = {
  roomId?: string;
  roomName?: string;
  roomDimensions?: string;

  /** Style props */
  propColor?: Property.Color;
  propCursor?: Property.Cursor;
};

const CamDisableContainer: FunctionComponent<CamDisableContainerType> = memo(
  ({ roomId, roomName, roomDimensions, propColor, propCursor }) => {
    const livingRoomStyle: CSS.Properties = useMemo(() => {
      return {
        color: propColor,
      };
    }, [propColor]);

    const penIconStyle: CSS.Properties = useMemo(() => {
      return {
        cursor: propCursor,
      };
    }, [propCursor]);

    return (
      <div className="cam1">
        <div className="label6">
          <div className="text6">
            <img className="start-icon1" alt="" src={roomId} />
            <div className="living-room3" style={livingRoomStyle}>
              {roomName}
            </div>
          </div>
          <div className="icons5">
            <img
              className="start-icon1"
              alt=""
              src={roomDimensions}
              style={penIconStyle}
            />
          </div>
        </div>
        <div className="pause">
          <img className="start-icon2" alt="" src="/start1.svg" />
        </div>
      </div>
    );
  }
);

export default CamDisableContainer;
