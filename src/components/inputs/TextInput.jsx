const TextInput = (props) => {
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
      />
    </>
  );
};

export default TextInput;
