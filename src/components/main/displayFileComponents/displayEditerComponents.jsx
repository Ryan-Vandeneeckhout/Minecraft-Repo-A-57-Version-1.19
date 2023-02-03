import TextInput from "../../inputs/TextInput";
import EditorTextAreaContainer from "./textareaComponents/EditorTextAreaContainer";

const DisplayEditerComponents = (props) => {
  return (
    <section className="displayFileEditorSection">
      <div className="displayFileEditorWrapper">
        <div className="upperSiteContent">
          <div className="displayEditorInput">
            <TextInput
              nameInput={props.filename}
              setNameInput={props.setFileName}
              labelText={"FILE:"}
            />
          </div>
          <div className="displayEditorInput">
            <TextInput
              nameInput={props.nameInput}
              setNameInput={props.setNameInput}
              labelText={"Creator:"}
            />{" "}
          </div>
        </div>
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
