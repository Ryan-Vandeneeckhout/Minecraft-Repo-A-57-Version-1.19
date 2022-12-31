import { useState } from "react";
import { Toggle } from "../../inputs/ToggleInput";
import EditorTextAreaContainer from "./textareaComponents/EditorTextAreaContainer";

const DisplayEditerComponents = (props) => {
  const [orderEditor, setOrderEditor] = useState(true);

  const logState = () => {
    setOrderEditor((orderEditor) => !orderEditor);
  };

  return (
    <section className="displayFileEditorSection">
      <div className="displayFileEditorWrapper">
        <Toggle label="Toggle me" toggled={true} onClick={logState} />
        <div className={`${orderEditor ? "orderEditorOne" : "orderEditorTwo"}`}>
          <EditorTextAreaContainer
            TextInputValue={"Preview Your File Input Here..."}
            TextAreaInputRef={props.contentFileUploadedPreviewRef}
            TextAreaTitle={"File Input Preview:"}
          />
        </div>
        <div className={`${orderEditor ? "orderEditorTwo" : "orderEditorOne"}`}>
          <EditorTextAreaContainer
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
