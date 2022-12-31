import { useRef } from "react";

import DisplayEditerComponents from "./displayFileComponents/displayEditerComponents";
import EditFileContainer from "./editFileCompoments/editFileContainer";

const DisplayEditComponentsContainer = () => {

  const contentFileUploadedPreviewRef = useRef(null);
  const contentFileOutputConversionRef = useRef(null);

  return (
    <>
      <EditFileContainer
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
      />
      <DisplayEditerComponents
        contentFileUploadedPreviewRef={contentFileUploadedPreviewRef}
        contentFileOutputConversionRef={contentFileOutputConversionRef}
      />
    </>
  );
};
export default DisplayEditComponentsContainer;
