import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DevMenu = (props) => {
  // Controls the opening and closing of the dev menu - located in the upper right corner of the navigation component //
  const [hoverOpen, setHoverOpen] = useState(false);

  const setHoverState = () => {
    setHoverOpen((hoverOpen) => !hoverOpen);
  };

  return (
    <div className="DevMenu">
      <button
        aria-label="Dev-Menu Selection Button"
        onClick={props.devMenuFunction}
        ref={props.DevMenuRef}
        className={`Dev-Menu-button${
          props.devMenuVisible ? " rotating" : " not"
        }`}
        onMouseEnter={setHoverState}
        onMouseLeave={setHoverState}
      >
        {/*On hover state have four icons to dictate more clarity to the user and their potential actions */}
        {props.devMenuVisible ? (
          <FontAwesomeIcon
            icon={`${hoverOpen ? "fa-angle-right" : "fa-times"}`}
          />
        ) : (
          <FontAwesomeIcon
            icon={`${hoverOpen ? "fa-angle-left" : "fa-bars"}`}
          />
        )}
        {/*Closed hover states */}
      </button>
    </div>
  );
};
export default DevMenu;
