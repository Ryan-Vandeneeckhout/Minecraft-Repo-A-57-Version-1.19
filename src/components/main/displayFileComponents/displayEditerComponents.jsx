import EditorTextAreaContainer from "./textareaComponents/EditorTextAreaContainer";

const DisplayEditerComponents = (props) => {
  return (
    <section className="displayFileEditorSection">
      <div className="displayFileEditorWrapper">
        <h4>File: {props.filename}</h4>
        <div className="orderEditorOne">
          <EditorTextAreaContainer
            TextInputValue={"Preview Your File Input Here..."}
            TextAreaInputRef={props.contentFileUploadedPreviewRef}
            TextAreaTitle={"File Input Preview:"}
          />
        </div>
        <div className="orderEditorTwo">
          <EditorTextAreaContainer
            OutputError={props.OutputError}
            TextInputValue={"Preview Your Converted File Output Here..."}
            TextAreaInputRef={props.contentFileOutputConversionRef}
            TextAreaTitle={"File Output Preview:"}
          />
        </div>
      </div>
    </section>
  );
};
export default DisplayEditerComponents;
