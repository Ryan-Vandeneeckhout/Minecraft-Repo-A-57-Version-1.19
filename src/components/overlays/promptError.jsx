import { useState } from "react";

const PromptError = (props) => {
  const [closeWindow, setCloseWindow] = useState(true);

  const closeWindowFunction = () => {
    setCloseWindow(!closeWindow);
  };

  return (
    <div
      className={`errorContentIdsFoundUnconverted${
        closeWindow ? "  displayFlex" : " displayNone"
      }`}
    >
      <div className="errorContentIdsFoundUnconvertedWrapper">
        <h3>{props.titleTextError}</h3>
        <p>{props.errorText}</p>
        <button className="closeWindowButton" onClick={closeWindowFunction}>
          X
        </button>
      </div>
    </div>
  );
};

export default PromptError;
