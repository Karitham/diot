import { FunctionComponent, memo, useMemo } from "react";
import CSS, { Property } from "csstype";
import "../styles/compo/AlertContainer.css";

type AlertContainerType = {
  dateTime?: string;
  dateTimeText?: string;
  timeText?: string;

  /** Style props */
  propBackgroundColor?: Property.BackgroundColor;
  propWidth?: Property.Width;
  propAlignSelf?: Property.AlignSelf;
  propDisplay?: Property.Display;
};

const AlertContainer: FunctionComponent<AlertContainerType> = memo(
  ({
    dateTime,
    dateTimeText,
    timeText,
    propBackgroundColor,
    propWidth,
    propAlignSelf,
    propDisplay,
  }) => {
    const typeStyle: CSS.Properties = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor,
      };
    }, [propBackgroundColor]);

    const vectorIconStyle: CSS.Properties = useMemo(() => {
      return {
        width: propWidth,
      };
    }, [propWidth]);

    const propertiesStyle: CSS.Properties = useMemo(() => {
      return {
        alignSelf: propAlignSelf,
      };
    }, [propAlignSelf]);

    const divStyle: CSS.Properties = useMemo(() => {
      return {
        display: propDisplay,
      };
    }, [propDisplay]);

    return (
      <div className="alert1">
        <div className="type" style={typeStyle}>
          <div className="sneak3">
            <img
              className="vector-icon19"
              alt=""
              src={dateTime}
              style={vectorIconStyle}
            />
          </div>
        </div>
        <div className="content">
          <div className="may-5th">{dateTimeText}</div>
          <div className="properties1" style={propertiesStyle}>
            <div className="may-5th">{timeText}</div>
            <div className="may-5th" style={divStyle}>
              12/05/22
            </div>
            <div className="may-5th">Living Room</div>
          </div>
        </div>
      </div>
    );
  }
);

export default AlertContainer;
