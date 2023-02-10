const TextInput = (props) => {
  //Used For File Name, Build Name and Creator Name inputs//
  const handleUserInput = (e) => {
    props.setNameInput(`${e.target.value}`);
  };

  return (
    <>
      <label htmlFor="builder-Name-Input">{props.labelText}</label>
      <input
        aria-label="builder-Name-Input"
        type="text"
        value={props.nameInput}
        onChange={handleUserInput}
        className="hoverYes"
      />
    </>
  );
};

export default TextInput;
