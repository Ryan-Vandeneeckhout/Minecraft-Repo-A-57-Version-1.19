const TextObjectInput = () => {
    
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
