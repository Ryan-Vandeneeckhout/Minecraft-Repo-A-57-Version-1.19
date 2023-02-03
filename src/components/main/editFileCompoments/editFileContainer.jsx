import { useRef } from "react";
import useState from "react-usestateref";
import DownloadFileInput from "../../inputs/downloadFileInput";
import NPCInput from "../../inputs/NumberInput";
import BedRockIDConversionButton from "./convertBedRockIDSComponents/BedRockIDConversionButton";
import FileOutPutButtonNPC from "./NPCcomponents/FileOutPutButtonNPC";
import UploadFile from "./uploadFileComponents/uploadFile";

const EditFileContainer = (props) => {
  const downloadFileBedRockIDRef = useRef(null);
  const downloadFileNPCCodeRef = useRef(null);
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

  return (
    <section className="editFileContainerSection">
      <div className="wrapperEditFile">
        <ul className="wrapperEditFileList">
          <UploadFile
            contentFileUploadedPreviewRef={props.contentFileUploadedPreviewRef}
            setFileName={props.setFileName}
          />
          <BedRockIDConversionButton
            contentFileUploadedPreviewRef={props.contentFileUploadedPreviewRef}
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
            setIDOutputBedRockFailedData={props.setIDOutputBedRockFailedData}
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
          />
          <DownloadFileInput
            downloadFileRef={downloadFileNPCCodeRef}
            downloadText={"Download NPC Conversion"}
          />
        </ul>
      </div>
    </section>
  );
};

export default EditFileContainer;
