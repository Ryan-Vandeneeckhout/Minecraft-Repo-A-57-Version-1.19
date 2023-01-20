import { useRef } from "react";
import useState from "react-usestateref";
import { db } from "../../../firebase/config.js";
import { doc, setDoc } from "firebase/firestore";
import { useCollection } from "../../../firebase/useFirestoreDatabase.js";

import { IndexKeyMineCraftNPC } from "./IndexKeyMinecraftNPC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BedRockIDConversionButton = (props) => {
  const BedRockIDConversionButtonRef = useRef(null);
  const { databaseFirestore } = useCollection("MissingIds");
  const [, setFailedIds, failedIdsRef] = useState("");
  const [, setTagValue, tagValueRef] = useState([]);
  const [, setIdValue, IdValueRef] = useState([]);

  const FireBaseIDs = async () => {
    //Add ID Failed to Firestore

    await setDoc(doc(db, `MissingIds`, `IDS`), {
      IdCollection: IdValueRef.current,
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
        setTagValue([...new Set(matches)]);
        if (databaseFirestore[0].IdCollection === (undefined || null)) {
          return;
        } else {
          setIdValue(databaseFirestore[0].IdCollection);
          tagValueRef.current.forEach((i) => {
            if (!databaseFirestore[0].IdCollection.includes(i)) {
              setIdValue([...IdValueRef.current, i]);
            } else {
              return;
            }
          });
        }
      }
    });

    if (matches === [] || matches === null || matches.length === 0) {
      alert("sucess");
    } else {
      let uniqueChars = [...new Set(matches)];
      setFailedIds([uniqueChars.toString().replaceAll("\\", "")]);
      props.setErrorContent(`${failedIdsRef.current}`);
      props.closeWindow(true);
      FireBaseIDs();
    }
  };

  return (
    <label
      ref={BedRockIDConversionButtonRef}
      className="buttonOne yellowB hoverYes"
      onClick={FileTest}
    >
      <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
      Bedrock ID Conversion:
    </label>
  );
};
export default BedRockIDConversionButton;
