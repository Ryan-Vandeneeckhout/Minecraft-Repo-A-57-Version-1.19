import useState from "react-usestateref";

const ColorInput = (props) => {
  const [colorShow, setColorShow, colorShowRef] = useState(`#ff0000`);
  const handleUserInput = (e) => {
    props.StateRef.current.style.backgroundColor = `${e.target.value}`;
    setColorShow(`${e.target.value}`);
  };

  const handleUserKeyUp = (e) => {
    props.setTagsArray([
      ...props.tagsarray,
      { colorItem: colorShowRef.current },
    ]);
    console.log(props.tagsarray);
  };
  return (
    <div className="colorInput">
      <label htmlFor="favcolor">{props.labelText}</label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={colorShow}
        onChange={handleUserInput}
        onClick={handleUserKeyUp}
      ></input>
    </div>
  );
};
export default ColorInput;
