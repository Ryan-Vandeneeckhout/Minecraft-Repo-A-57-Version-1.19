import { useState } from "react";
import { Toggle } from "../../inputs/ToggleInput";
import EditorTextAreaContainer from "./textareaComponents/EditorTextAreaContainer";

const DisplayEditerComponents = (props) => {
  const [orderEditor, setOrderEditor] = useState(true);

  const logState = () => {
    setOrderEditor((orderEditor) => !orderEditor);
  };

  const errorContentOutput = () => {
    if (props.errorContent === "");
    else {
      return (
        <p>
          <span className="redC">
            Output conversion contains Ids that have may failed conversion
            please check the following Ids
          </span>{" "}
          - {props.errorContent}
        </p>
      );
    }
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
            OutputError={props.OutputError}
            TextInputValue={"Preview Your Converted File Output Here..."}
            TextAreaInputRef={props.contentFileOutputConversionRef}
            TextAreaTitle={"File Output Preview:"}
          />
        </div>
        {errorContentOutput()}
      </div>
    </section>
  );
};
export default DisplayEditerComponents;
