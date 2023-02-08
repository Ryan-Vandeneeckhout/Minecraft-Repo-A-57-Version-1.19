import { useRef } from "react";
import useState from "react-usestateref";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DownloadFileInput from "../../inputs/downloadFileInput";
import NPCInput from "../../inputs/NumberInput";
import BedRockIDConversionButton from "./convertBedRockIDSComponents/BedRockIDConversionButton";
import FileOutPutButtonNPC from "./NPCcomponents/FileOutPutButtonNPC";
import UploadFile from "./uploadFileComponents/uploadFile";

const EditFileContainer = (props) => {
  const downloadFileBedRockIDRef = useRef(null);
  const downloadFileNPCCodeRef = useRef(null);
  const downloadFileToolKitRef = useRef(null);
  const STFRef = useRef(null);
  const [valueInput, setValueInput] = useState(400);

  function downloadFile() {
    const blob = new Blob([props.dataConvertedStateHolderRef.current], {
      type: "plain/text",
    });
    const fileUrl = URL.createObjectURL(blob);
    downloadFileBedRockIDRef.current.classList.remove("blueB", "DisplayNone");
    downloadFileBedRockIDRef.current.classList.add("greenB", "DisplayFlex");
    downloadFileBedRockIDRef.current.setAttribute("href", fileUrl);
    if (props.filename.includes(".txt")) {
      downloadFileBedRockIDRef.current.setAttribute(
        "download",
        props.filename.replace(".txt", "") + " Optimized Build.txt"
      );
    } else if (!props.filename.includes(".")) {
      downloadFileBedRockIDRef.current.setAttribute(
        "download",
        props.filename + " Optimized Build.txt"
      );
    } else {
      downloadFileBedRockIDRef.current.setAttribute(
        "download",
        props.filename.replace(".mcfunction", "") + "Optimized Build.mcfunction"
      );
    }
  }

  function downloadFileNPC() {
    const blob = new Blob(
      [props.contentFileOutputConversionRef.current.value],
      {
        type: "plain/text",
      }
    );
    const fileUrl = URL.createObjectURL(blob);
    downloadFileNPCCodeRef.current.classList.remove("blueB", "DisplayNone");
    downloadFileNPCCodeRef.current.classList.add("greenB", "DisplayFlex");
    downloadFileNPCCodeRef.current.setAttribute("href", fileUrl);
    if (props.filename.includes(".txt")) {
      downloadFileNPCCodeRef.current.setAttribute(
        "download",
        props.filename.replace(".txt", "") + " Optimized NPC Build.txt"
      );
    } else if (!props.filename.includes(".")) {
      downloadFileNPCCodeRef.current.setAttribute(
        "download",
        props.filename + " Optimized NPC Build.txt"
      );
    } else {
      downloadFileNPCCodeRef.current.setAttribute(
        "download",
        props.filename.replace(".mcfunction", "") +
          "Optimized NPC Build.mcfunction"
      );
    }
  }

  function downloadFileToolkit() {
    const blob = new Blob(
      [props.contentFileOutputConversionRef.current.value],
      {
        type: "plain/text",
      }
    );
    const fileUrl = URL.createObjectURL(blob);
    downloadFileToolKitRef.current.classList.remove("blueB", "DisplayNone");
    downloadFileToolKitRef.current.classList.add("greenB", "DisplayFlex");
    downloadFileToolKitRef.current.setAttribute("href", fileUrl);
    if (props.filename.includes(".txt")) {
      downloadFileToolKitRef.current.setAttribute(
        "download",
        props.filename.replace(".txt", "") + " Optimized NPC ToolKit Build.txt"
      );
    } else if (!props.filename.includes(".")) {
      downloadFileToolKitRef.current.setAttribute(
        "download",
        props.filename + " Optimized NPC ToolKit Build.txt"
      );
    } else {
      downloadFileToolKitRef.current.setAttribute(
        "download",
        props.filename.replace(".mcfunction", "") +
          "Optimized NPC ToolKit Build.mcfunction"
      );
    }
  }

  const Structure2FunctionSwitch = () => {
    props.setStructure2F((prevCheck) => !prevCheck);

    if (props.STF === true) {
      STFRef.current.style.backgroundColor = "green";
      STFRef.current.style.color = "white";
    } else {
      STFRef.current.style.backgroundColor = "goldenrod";
      STFRef.current.style.color = "black";
    }
  };

  return (
    <section className="editFileContainerSection">
      <div className="wrapperEditFile">
        <ul className="wrapperEditFileList">
          <button
            ref={STFRef}
            className="StructureButton yellowB"
            onClick={Structure2FunctionSwitch}
          >
            <span>
              <FontAwesomeIcon className="fontAweIcon" icon="fa-database" />
            </span>{" "}
            Structure to Function Converter
          </button>
          {props.STF ? (
            <>
              <UploadFile
                contentFileUploadedPreviewRef={
                  props.contentFileUploadedPreviewRef
                }
                setFileName={props.setFileName}
              />
              <BedRockIDConversionButton
                contentFileUploadedPreviewRef={
                  props.contentFileUploadedPreviewRef
                }
                contentFileOutputConversionRef={
                  props.contentFileOutputConversionRef
                }
                downloadFileFailedIDs={props.downloadFileFailedIDs}
                closeWindow={props.closeWindow}
                setErrorContent={props.setErrorContent}
                downloadFile={downloadFile}
                setDataBedRockOriginal={props.setDataBedRockOriginal}
                setDataConvertedStateHolder={props.setDataConvertedStateHolder}
                setFailedIdsDownload={props.setFailedIdsDownload}
                loading={props.loading}
                setLoading={props.setLoading}
                setGreyWidth={props.setGreyWidth}
                setProgessStatus={props.setProgessStatus}
                setGreenWidth={props.setGreenWidth}
                setIDOutputBedRockFailedData={
                  props.setIDOutputBedRockFailedData
                }
              />
              <DownloadFileInput
                downloadFileRef={downloadFileBedRockIDRef}
                downloadText={"Download BedRock Id Conversion"}
              />
              <NPCInput valueInput={valueInput} setValueInput={setValueInput} />
              <FileOutPutButtonNPC
                FileName={props.filename}
                contentOutputTargetHoldDataRef={props.dataBedRockOriginal}
                contentOutputTargetRef={props.contentFileOutputConversionRef}
                downloadFile={downloadFileNPC}
                valueInput={valueInput}
                nameInput={props.nameInput}
                setDataConvertedStateHolder={props.setDataConvertedStateHolder}
                nbtVersionTool="horizon"
                downloadFileToolKit={downloadFileToolkit}
              />
              <DownloadFileInput
                downloadFileRef={downloadFileNPCCodeRef}
                downloadText={"Download NPC Horizon Conversion"}
              />{" "}
              <FileOutPutButtonNPC
                FileName={props.filename}
                contentOutputTargetHoldDataRef={props.dataBedRockOriginal}
                contentOutputTargetRef={props.contentFileOutputConversionRef}
                downloadFile={downloadFileNPC}
                valueInput={valueInput}
                nameInput={props.nameInput}
                setDataConvertedStateHolder={props.setDataConvertedStateHolder}
                nbtVersionTool="toolkit"
                downloadFileToolKit={downloadFileToolkit}
              />
              <DownloadFileInput
                downloadFileRef={downloadFileToolKitRef}
                downloadText={"Download NPC ToolKit Conversion"}
              />{" "}
            </>
          ) : null}
        </ul>
      </div>
    </section>
  );
};

export default EditFileContainer;
