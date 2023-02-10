import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PromptError from "../../../overlays/promptError";

const UploadFile = (props) => {
  const inputFileRef = useRef(null);
  const inputButton = useRef(null);
  const [errorPrompt, setErrorPrompt] = useState(false);

  function getFile() {
    if (inputFileRef.current === null) {
      setErrorPrompt(true);
    } else {
      if (
        "files" in inputFileRef.current &&
        inputFileRef.current.files.length > 0
      ) {
        placeFileContent(
          props.contentFileUploadedPreviewRef.current,
          inputFileRef.current.files[0]
        );
        props.setFileName(inputFileRef.current.value.split("\\").pop());
        inputButton.current.classList.add("yellowB");
        inputButton.current.classList.remove("redB", "greenB");
      }
    }
  }

  function placeFileContent(target, file) {
    readFileContent(file)
      .then((content) => {
        target.value = content;
        inputButton.current.classList.add("greenB");
        inputButton.current.classList.remove("redB", "yellowB");
      })
      .catch((error) => {
        inputButton.current.classList.add("redB");
        inputButton.current.classList.remove("greenB", "yellowB");
        console.log(error);
      });
  }

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
  return (
    <>
      <label
        className="uploadFileLabel yellowB hoverYes"
        htmlFor="files"
        ref={inputButton}
      >
        <FontAwesomeIcon className="fontAweIconLeftMargin" icon="fa-upload" />{" "}
        Upload File{" "}
      </label>
      <input
        className="displayNone"
        type="file"
        id="files"
        onChange={getFile}
        ref={inputFileRef}
      />
      {errorPrompt ? (
        <PromptError
          titleTextError="File Not Found"
          errorText="Warning, it appears that something went wrong with the upload of your file, please ensure that the file being uploaded is not empty and is a text file"
        />
      ) : null}
    </>
  );
};
export default UploadFile;
