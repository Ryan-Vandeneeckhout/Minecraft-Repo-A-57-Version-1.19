import EditorTextArea from "./EditorTextArea";

const EditorTextAreaContainer = (props) => {
  return (
    <div className="textAreaContainer">
      <h3>{props.TextAreaTitle}</h3>
      <EditorTextArea
        TextInputValue={props.TextInputValue}
        TextAreaInputRef={props.TextAreaInputRef}
      />
    </div>
  );
};

export default EditorTextAreaContainer;
