const EditorTextArea = (props) => {
  //File Editor place text, editable and useable to rename commands//
  return (
    <textarea ref={props.TextAreaInputRef} placeholder={props.TextInputValue} />
  );
};
export default EditorTextArea;
