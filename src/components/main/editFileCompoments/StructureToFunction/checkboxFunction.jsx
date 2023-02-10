const CheckboxFunction = (props) => {
  // Simple Check box used in STF //
  return (
    <label>
      <input type="checkbox" id={props.IDText} defaultChecked />{" "}
      {props.InputText}
    </label>
  );
};

export default CheckboxFunction;
