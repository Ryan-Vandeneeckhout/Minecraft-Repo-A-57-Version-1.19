import { useRef } from "react";
import { IndexKeyMineCraftNPC } from "./IndexKeyMinecraftNPC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BedRockIDConversionButton = (props) => {
  const BedRockIDConversionButtonRef = useRef(null);
  if (!props.contentFileUploadedPreviewRef);

  const FileTest = () => {
    BedRockIDConversionButtonRef.current.classList.add("yellowB");
    BedRockIDConversionButtonRef.current.classList.remove("greenB", "redB");

    let str = props.contentFileUploadedPreviewRef.current.value;
    Object.keys(IndexKeyMineCraftNPC).forEach((key) => {
      str = str.replaceAll(key, IndexKeyMineCraftNPC[key]);
    });
    BedRockIDConversionButtonRef.current.classList.add("greenB");
    BedRockIDConversionButtonRef.current.classList.remove("redB", "yellowB");
    props.contentFileOutputConversionRef.current.value = str;
    props.setDataBedRockOriginal(str);
    props.setDataConvertedStateHolder(str);
    props.downloadFile();
  };

  return (
    <label ref={BedRockIDConversionButtonRef} className="buttonOne yellowB" onClick={FileTest}>
      <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
      Bedrock ID Conversion:
    </label>
  );
};
export default BedRockIDConversionButton;
