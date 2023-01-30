import { useRef, useState } from "react";

import DisplayEditerComponents from "./displayFileComponents/displayEditerComponents";
import EditFileContainer from "./editFileCompoments/editFileContainer";

const DisplayEditComponentsContainer = (props) => {
  const contentFileUploadedPreviewRef = useRef(null);
  const contentFileOutputConversionRef = useRef(null);
  const [filename, setFileName] = useState("No File Specified");

  return (
    <div className="mainContentMediaHolder">
      <EditFileContainer
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
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
      />
      <DisplayEditerComponents
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
        filename={filename}
      />
    </div>
  );
};
export default DisplayEditComponentsContainer;
