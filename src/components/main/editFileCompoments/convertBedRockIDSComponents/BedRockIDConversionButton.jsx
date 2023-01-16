import { useRef } from "react";
import useState from "react-usestateref";
import { db } from "../../../firebase/config.js";
import { collection, addDoc } from "firebase/firestore";

import { IndexKeyMineCraftNPC } from "./IndexKeyMinecraftNPC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BedRockIDConversionButton = (props) => {
  const BedRockIDConversionButtonRef = useRef(null);
  const [, setFailedIds, failedIdsRef] = useState("");

  const handleSubmit = async () => {
    //Add ID Failed to Firestore

    await addDoc(collection(db, `MissingValues`), {
      IdCollection: failedIdsRef.current,
    });
  };

  if (!props.contentFileUploadedPreviewRef) {
  }

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

    const strs = [str];
    const rx = /\[([^\][]*)]/g;
    let matches = [];
    strs.forEach((x) => {
      if (x.match(rx) === null);
      else {
        matches = [...x.match(rx)];
      }
    });

    if (matches === [] || matches === null);
    else {
      let uniqueChars = [...new Set(matches)];
      setFailedIds(uniqueChars.toString().replaceAll("\\", ""));
      props.setErrorContent(`${failedIdsRef.current}`);
    }
    handleSubmit();
  };

  return (
    <label
      ref={BedRockIDConversionButtonRef}
      className="buttonOne yellowB"
      onClick={FileTest}
    >
      <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
      Bedrock ID Conversion:
    </label>
  );
};
export default BedRockIDConversionButton;
