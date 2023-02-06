import { useRef } from "react";
import { CheckBoxButtonMap } from "./CheckBoxButtonMap";
import CheckboxFunction from "./checkboxFunction";

const Stucture2Function = () => {
  const DownloadButtonRef = useRef(null);

  return (
    <section className="structure2FunctionSection">
      <script src="./pnbt.js"></script>
      <script src="./script.js"></script>
      <script src="../js/datahandler.js"></script>
      <div className="structure2FunctionWrapper">
        <h2>Structure To Function Convertor</h2>
        <textarea
          placeholder="Your progress logs will appear here..."
          disabled
          id="output-logs"
        />
        <div className="buttonsContainer">
          <button
            ref={DownloadButtonRef}
            onClick={window["download"]}
            id="download-btn"
          >
            Convert File
          </button>
          <div className="uploadButtonSTF" id="upload">
            <label htmlFor="dataFileInput" onClick={window["handleSomeDiv"]}>
              Upload
            </label>
            <input
              id="dataFileInput"
              type="file"
              readertype="arraybuffer/text"
              accept=".mcstructure,.json"
            />
          </div>
          <div className="parameters-tab">
            {CheckBoxButtonMap.map((item, index) => {
              return (
                <CheckboxFunction
                  key={index}
                  IDText={item.IDText}
                  InputText={item.InputText}
                />
              );
            })}
          </div>
          <a
            className="downloadCompletedFile"
            href="defaultURL"
            id="downloadCompletedFile"
          >
            Download Completed File
          </a>
        </div>

        <p>
          Based on Rebrainer's Structure to Function Editor found{" "}
          <a href="https://mcbe-essentials.github.io/structure-to-function/">
            here
          </a>{" "}
          and original codebase as found{" "}
          <a href="https://github.com/MCBE-Essentials/mcbe-essentials.github.io">
            here
          </a>
          . Not meant to be a replacement for ReBrainer's Editor which contains
          more functionality and versatility. Adapted to fit the needs of the
          NBT Community and the current toolkit created by Kitty_Shizz.
        </p>

        <h3>License</h3>
        <p>
          MCBE Essentials by ReBrainerTV is licensed under a Creative Commons
          Attribution-ShareAlike 4.0 International License. Based on a work at{" "}
          <a href="https://github.com/MCBE-Essentials/mcbe-essentials.github.io">
            https://github.com/MCBE-Essentials/mcbe-essentials.github.io.
          </a>
        </p>
      </div>
    </section>
  );
};
export default Stucture2Function;
