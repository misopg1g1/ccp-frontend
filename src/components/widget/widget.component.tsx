import React, { MouseEventHandler } from "react";
import "./widget.scss";

interface WidgetProps {
  quantity: string;
  description: string;
  icon: JSX.Element;
  iconAction: MouseEventHandler<HTMLDivElement>;
  background?: boolean;
}

export const Widget = (props: WidgetProps) => {
  const personalizedIcon = React.cloneElement(props.icon, {
    style: {
      color: !props.background ? "#2f76e6" : "white",
      cursor: "pointer" 
    },
  });
  return (
    <div
      className="widget-root"
      style={{ backgroundColor: props.background ? "#2f76e6" : "white" }}
    >
      <div className="left-container">
        <p
          className="quantity-text"
          style={{ color: !props.background ? "#2f76e6" : "white" }}
        >
          {props.quantity}
        </p>
        <p
          className="description-text"
          style={{ color: !props.background ? "black" : "white" }}
        >
          {props.description}
        </p>
      </div>
      <div className="right-container" onClick={props.iconAction}>
        {personalizedIcon}
      </div>
    </div>
  );
};
