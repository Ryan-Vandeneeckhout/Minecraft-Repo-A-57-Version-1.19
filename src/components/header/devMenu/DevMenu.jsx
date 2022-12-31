import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DevMenu = (props) => {
  return (
    <div className="DevMenu">
      <button
        aria-label="Dev-Menu Selection Button"
        onClick={props.devMenuFunction}
        ref={props.DevMenuRef}
        className={`Dev-Menu-button${
          props.devMenuVisible ? " rotating" : " not"
        }`}
      >
        <FontAwesomeIcon
          icon={`${props.devMenuVisible ? "fa-times" : "fa-bars"}`}
        />
      </button>
    </div>
  );
};
export default DevMenu;
