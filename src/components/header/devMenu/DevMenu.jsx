import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DevMenu = (props) => {
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
        {props.devMenuVisible ? (
          <FontAwesomeIcon
            icon={`${hoverOpen ? "fa-angle-right" : "fa-times"}`}
          />
        ) : (
          <FontAwesomeIcon
            icon={`${hoverOpen ? "fa-angle-left" : "fa-bars"}`}
          />
        )}
      </button>
    </div>
  );
};
export default DevMenu;
