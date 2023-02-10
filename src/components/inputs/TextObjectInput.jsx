const TextObjectInput = () => {
  //Legacy code used in the creation of text objects for the adminstator//

  const handleUserInput = (e) => {
    props.setTextObjectInputValue(`${e.target.value}`);
  };

  return (
    <>
      <label htmlFor="builder-Name-Input">{props.labelText}</label>
      <input
        aria-label="builder-Name-Input"
        type="text"
        value={props.textObjectInputValue}
        onChange={handleUserInput}
      />
    </>
  );
};

export default TextObjectInput;
