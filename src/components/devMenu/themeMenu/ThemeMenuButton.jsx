import { useRef } from "react";

const ThemeMenuButton = (props) => {
  const ButtonRef = useRef(null);
  let htmlElement = document.documentElement;

  const ButtonEntered = () => {
    ButtonRef.current.style.backgroundColor = "white";
    ButtonRef.current.style.color = "black";
  };
  const ButtonLeft = () => {
    ButtonRef.current.style.backgroundColor = props.ButtonColor;
    ButtonRef.current.style.color = "white";
  };

  return (
    <button
      ref={ButtonRef}
      aria-label={props.ButtonText}
      onClick={() => { htmlElement.setAttribute("data-theme", props.ThemeHTML); window.localStorage.setItem('dataTheme', (props.ThemeHTML)) }}
      style={{ backgroundColor: props.ButtonColor, color: "white" }}
      onMouseEnter={ButtonEntered}
      onMouseLeave={ButtonLeft}
    >
      {props.ButtonText}
    </button>
  );
};
export default ThemeMenuButton;
