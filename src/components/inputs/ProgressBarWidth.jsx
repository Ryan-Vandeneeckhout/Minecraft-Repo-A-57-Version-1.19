const ProgressBarWidth = (props) => {
  // Loading bar for the main menu and NPC conversions//
  return (
    <div className="progressBarContainer">
      <div className="Bar">
        <div
          className="greenBar"
          style={{ color: "green", width: `${props.widthGreen.current}%` }}
        />
        <div className="greyBar" style={{ color: "grey" }} />
      </div>
    </div>
  );
};
export default ProgressBarWidth;
