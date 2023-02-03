import { useRef, useState } from "react";

import DisplayEditerComponents from "./displayFileComponents/displayEditerComponents";
import EditFileContainer from "./editFileCompoments/editFileContainer";

const DisplayEditComponentsContainer = (props) => {
  const contentFileUploadedPreviewRef = useRef(null);

  const [filename, setFileName] = useState("No File Specified");
  const [nameInput, setNameInput] = useState("Kitty_Shizz");

  return (
    <div className="mainContentMediaHolder">
      <EditFileContainer
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={props.contentFileOutputConversionRef}
        setErrorContent={props.setErrorContent}
        closeWindow={props.closeWindow}
        setFailedIdsDownload={props.setFailedIdsDownload}
        downloadFileFailedIDs={props.downloadFileFailedIDs}
        loading={props.loading}
        setLoading={props.setLoading}
        setFileName={setFileName}
        filename={filename}
        setGreyWidth={props.setGreyWidth}
        setProgessStatus={props.setProgessStatus}
        setGreenWidth={props.setGreenWidth}
        nameInput={nameInput}
        setIDOutputBedRockFailedData={props.setIDOutputBedRockFailedData}
        setDataBedRockOriginal={props.setDataBedRockOriginal}
        dataBedRockOriginal={props.dataBedRockOriginal}
        setDataConvertedStateHolder={props.setDataConvertedStateHolder}
        dataConvertedStateHolderRef={props.dataConvertedStateHolderRef}
      />
      <DisplayEditerComponents
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={props.contentFileOutputConversionRef}
        filename={filename}
        setFileName={setFileName}
        nameInput={nameInput}
        setNameInput={setNameInput}
      />
    </div>
  );
};
export default DisplayEditComponentsContainer;
