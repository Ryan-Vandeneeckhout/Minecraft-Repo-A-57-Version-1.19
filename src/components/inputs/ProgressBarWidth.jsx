const ProgressBarWidth = (props) => {
  return (
    <div className="progressBarContainer">
      <div className="Bar">
        <div
          className="greenBar"
          style={{ color: "green", width: `${props.widthGreen}%` }}
        />
        <div className="greyBar" style={{ color: "grey" }} />
      </div>
    </div>
  );
};
export default ProgressBarWidth;
