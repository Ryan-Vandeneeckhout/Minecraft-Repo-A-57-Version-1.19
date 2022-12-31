import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UploadFile = (props) => {
  const inputFileRef = useRef(null);
  const inputButton = useRef(null);
  const [inputSuccess, setInputSuccess] = useState(false);

  function getFile() {
    if (inputFileRef.current === null);
    else {
      if (
        "files" in inputFileRef.current &&
        inputFileRef.current.files.length > 0
      ) {
        placeFileContent(
          props.contentFileUploadedPreviewRef.current,
          inputFileRef.current.files[0]
        );
        setInputSuccess(true);
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
        className="uploadFileLabel yellowB"
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
      <label className="fileInputSelectedOutputText">
        {inputSuccess ? (
          <p>File Selected - {inputFileRef.current.value.split("\\").pop()}</p>
        ) : (
          <p>No File Selected</p>
        )}
      </label>
    </>
  );
};
export default UploadFile;
