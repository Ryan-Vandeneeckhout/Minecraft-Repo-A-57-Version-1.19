import { useRef } from "react";
import useState from "react-usestateref";
import DownloadFileInput from "../../inputs/downloadFileInput";
import NPCInput from "../../inputs/NumberInput";
import TextInput from "../../inputs/TextInput";
import BedRockIDConversionButton from "./convertBedRockIDSComponents/BedRockIDConversionButton";
import FileOutPutButtonNPC from "./NPCcomponents/FileOutPutButtonNPC";
import UploadFile from "./uploadFileComponents/uploadFile";

const EditFileContainer = (props) => {
  const downloadFileBedRockIDRef = useRef(null);
  const downloadFileNPCCodeRef = useRef(null);

  const [valueInput, setValueInput] = useState(400);
  const [filename, setFileName] = useState("No File Specified");
  const [nameInput, setNameInput] = useState("Kitty_Shizz");
  const [dataBedRockOriginal, setDataBedRockOriginal] = useState(null);
  const [, setDataConvertedStateHolder, dataConvertedStateHolderRef] = useState(
    null
  );

  function downloadFile() {
    const blob = new Blob([dataConvertedStateHolderRef.current], {
      type: "plain/text",
    });
    const fileUrl = URL.createObjectURL(blob);
    downloadFileBedRockIDRef.current.classList.remove("blueB", "DisplayNone");
    downloadFileBedRockIDRef.current.classList.add("greenB", "DisplayFlex");
    downloadFileBedRockIDRef.current.setAttribute("href", fileUrl);
    if (filename.includes(".txt")) {
      downloadFileBedRockIDRef.current.setAttribute(
        "download",
        filename.replace(".txt", "") + " Optimized Build.txt"
      );
    } else if (!filename.includes(".")) {
      downloadFileBedRockIDRef.current.setAttribute(
        "download",
        filename + " Optimized Build.txt"
      );
    } else {
      downloadFileBedRockIDRef.current.setAttribute(
        "download",
        filename.replace(".mcfunction", "") + "Optimized Build.mcfunction"
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
    if (filename.includes(".txt")) {
      downloadFileNPCCodeRef.current.setAttribute(
        "download",
        filename.replace(".txt", "") + " Optimized NPC Build.txt"
      );
    } else if (!filename.includes(".")) {
      downloadFileNPCCodeRef.current.setAttribute(
        "download",
        filename + " Optimized NPC Build.txt"
      );
    } else {
      downloadFileNPCCodeRef.current.setAttribute(
        "download",
        filename.replace(".mcfunction", "") + "Optimized NPC Build.mcfunction"
      );
    }
  }

  return (
    <section className="editFileContainerSection">
      <div className="wrapperEditFile">
        <ul className="wrapperEditFileList">
          <UploadFile
            contentFileUploadedPreviewRef={props.contentFileUploadedPreviewRef}
            setFileName={setFileName}
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
            setDataBedRockOriginal={setDataBedRockOriginal}
            setDataConvertedStateHolder={setDataConvertedStateHolder}
            setFailedIdsDownload={props.setFailedIdsDownload}
            loading={props.loading}
            setLoading={props.setLoading}
          />
          <TextInput
            nameInput={filename}
            setNameInput={setFileName}
            labelText={"Edit filename:"}
          />
          <DownloadFileInput
            downloadFileRef={downloadFileBedRockIDRef}
            downloadText={"Download BedRock Id Conversion"}
          />
          <NPCInput valueInput={valueInput} setValueInput={setValueInput} />
          <TextInput
            nameInput={nameInput}
            setNameInput={setNameInput}
            labelText={"Edit Creator Name:"}
          />
          <FileOutPutButtonNPC
            FileName={filename}
            contentOutputTargetHoldDataRef={dataBedRockOriginal}
            contentOutputTargetRef={props.contentFileOutputConversionRef}
            downloadFile={downloadFileNPC}
            valueInput={valueInput}
            nameInput={nameInput}
            setDataConvertedStateHolder={setDataConvertedStateHolder}
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
