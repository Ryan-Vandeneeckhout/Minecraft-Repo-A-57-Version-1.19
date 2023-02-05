const CheckboxFunction = (props) => {
  return (
    <label>
      <input type="checkbox" id={props.IDText} defaultChecked />{" "}
      {props.InputText}
    </label>
  );
};

export default CheckboxFunction;
