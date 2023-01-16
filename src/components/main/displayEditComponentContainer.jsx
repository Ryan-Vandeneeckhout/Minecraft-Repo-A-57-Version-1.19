import { useRef, useState } from "react";

import DisplayEditerComponents from "./displayFileComponents/displayEditerComponents";
import EditFileContainer from "./editFileCompoments/editFileContainer";

const DisplayEditComponentsContainer = () => {
  const contentFileUploadedPreviewRef = useRef(null);
  const contentFileOutputConversionRef = useRef(null);
  const [errorContent, setErrorContent] = useState("");

  return (
    <div className="mainContentMediaHolder">
      <EditFileContainer
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
        setErrorContent={setErrorContent}
      />
      <DisplayEditerComponents
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
        errorContent={errorContent}
      />
    </div>
  );
};
export default DisplayEditComponentsContainer;
