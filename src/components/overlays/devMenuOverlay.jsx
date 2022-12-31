const DevMenuOverlay = (props) => {
  return (
    <div
      className={`overlay${props.devMenuVisible ? " displayFlex" : " displayNone"}`}
      onClick={props.devMenuFunction}
    />
  );
};
export default DevMenuOverlay;
