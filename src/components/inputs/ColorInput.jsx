import useState from "react-usestateref";

const ColorInput = (props) => {
  const [colorShow, setColorShow] = useState(`#ff0000`);
  const [tagsarray, setTagsArray] = useState([]);
  const handleUserInput = (e) => {
    props.StateRef.current.style.backgroundColor = `${e.target.value}`;
    setColorShow(`${e.target.value}`);

    setTagsArray((tagsarray) => [...tagsarray, { poop: "not poop" }]);
    console.log(tagsarray);
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
      ></input>
    </div>
  );
};
export default ColorInput;
