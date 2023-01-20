import { useRef } from "react";

import DisplayEditerComponents from "./displayFileComponents/displayEditerComponents";
import EditFileContainer from "./editFileCompoments/editFileContainer";

const DisplayEditComponentsContainer = (props) => {
  const contentFileUploadedPreviewRef = useRef(null);
  const contentFileOutputConversionRef = useRef(null);

  return (
    <div className="mainContentMediaHolder">
      <EditFileContainer
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
        setErrorContent={props.setErrorContent}
        closeWindow={props.closeWindow}
      />
      <DisplayEditerComponents
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
      />
    </div>
  );
};
export default DisplayEditComponentsContainer;
