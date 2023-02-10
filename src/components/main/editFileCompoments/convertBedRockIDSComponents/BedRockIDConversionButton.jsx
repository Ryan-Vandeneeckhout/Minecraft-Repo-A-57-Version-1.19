import { useRef } from "react";
import useState from "react-usestateref";
import { db } from "../../../firebase/config.js";
import { doc, setDoc } from "firebase/firestore";
import { useCollection } from "../../../firebase/useFirestoreDatabase.js";

import { IndexKeyMineCraftNPC } from "./IndexKeyMinecraftNPC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PromptError from "../../../overlays/promptError.jsx";

const BedRockIDConversionButton = (props) => {
  const BedRockIDConversionButtonRef = useRef(null);
  const { databaseFirestore } = useCollection("MissingIds");
  const [, setFailedIds, failedIdsRef] = useState("");
  const [, setTagValue, tagValueRef] = useState([]);
  const [, setIdValue, IdValueRef] = useState([]);

  const [errorPrompt, setErrorPrompt] = useState(false);

  const FireBaseIDs = async () => {
    //Add ID Failed to Firestore

    await setDoc(doc(db, `MissingIds`, `IDS`), {
      IdCollection: IdValueRef.current,
    });
  };

  if (!props.contentFileUploadedPreviewRef) {
  }

  const FileTest = () => {
    if (
      props.contentFileUploadedPreviewRef.current.value ===
        (undefined || null) ||
      props.contentFileUploadedPreviewRef.current.value === ""
    ) {
      //Content was found to be empty or null - open prompt menu
      BedRockIDConversionButtonRef.current.classList.add("redB");
      BedRockIDConversionButtonRef.current.classList.remove("yellowB");
      setErrorPrompt(true);
    } else {
      //content converison start //
      BedRockIDConversionButtonRef.current.classList.add("yellowB");
      BedRockIDConversionButtonRef.current.classList.remove("greenB", "redB");

      let str = props.contentFileUploadedPreviewRef.current.value;

      //Compatible with auto replace for Rebrainer's STF from his site//

      if (str.includes("ReBrainer")) {
        str = str.replaceAll(/#.*?\)/g, "");
        for (let i = 0; i < 3; i++) str = str.substring(str.indexOf("\n") + 1);
      }
      //Dirty commands removal
      str = str.replaceAll(/execute.*? 0/g, "");
      str = str.replaceAll("execute", "");
      str = str.replaceAll(" 0", "");
      str = str.replaceAll(/(^[ \t]*\n)/gm, "");
      Object.keys(IndexKeyMineCraftNPC).forEach((key) => {
        //Most import function for the bedrock update and replace object//
        str = str.replaceAll(key, IndexKeyMineCraftNPC[key]);
        //For each update loading bar with a tick to completion//
        props.setGreenWidth(
          Math.ceil(
            100 *
              (Object.keys(IndexKeyMineCraftNPC).indexOf(key) /
                Object.keys(IndexKeyMineCraftNPC).length)
          )
        );
      });
      //Mission complete//

      BedRockIDConversionButtonRef.current.classList.add("greenB");
      BedRockIDConversionButtonRef.current.classList.remove("redB", "yellowB");
      props.contentFileOutputConversionRef.current.value = str;
      //mutable string object
      props.setDataBedRockOriginal(str);
      //Hold a copy of the bedrock converted data for future use
      props.setDataConvertedStateHolder(str);
      //set download file ready
      props.downloadFile();
      //set data for user to ensure easier manual replacement of IDS
      props.setIDOutputBedRockFailedData(
        (str = str.replaceAll("]", "] <---Failed ID"))
      );

      const strs = [str];
      const rx = /\[([^\][]*)]/g;
      let matches = [];
      strs.forEach((x) => {
        if (x.match(rx) === null);
        else {
          //Push matches to a new array and wait for firebase
          matches = [...x.match(rx)];
          setTagValue([...new Set(matches)]);

          if (databaseFirestore[0].IdCollection === (undefined || null)) {
            //Firebase connection failed or arry is null
            return;
          } else {
            //Upadate Firebase with new ids
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
        //Set loading bar to 100 percent if there are not error ids found!.
        props.setGreenWidth(100);
        props.setProgessStatus("Conversion Complete");
      } else {
        //IDs failed to convert message prompt and download file for the Error Prompt
        let uniqueChars = [...new Set(matches)];
        setFailedIds([uniqueChars.toString().replaceAll("\\", "")]);
        props.setErrorContent(`${failedIdsRef.current}`);
        props.setFailedIdsDownload(
          "Kitty_Shizz here. I am sorry about meeting like this, \nit appears that there are the following unconverted IDs\n in your build. Please download your file from the\n Download BedRock Id Conversion button\n and remove the IDs from your file and upload \nthe file once again to continue the conversion. I am working to collect all\n the IDs but I may have missed all the possible\n combinations for written objects.\n FAILED ID LIST:\n" +
            [uniqueChars.toString().replaceAll("\\", "")]
        );
        props.downloadFileFailedIDs();
        props.closeWindow(true);
        props.setProgessStatus("Conversion Errors Detected");
        FireBaseIDs();
      }
    }
  };

  return (
    <>
      <label
        ref={BedRockIDConversionButtonRef}
        className="buttonOne yellowB hoverYes"
        onClick={FileTest}
      >
        <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
        Bedrock ID Conversion:
      </label>
      {errorPrompt ? (
        <PromptError
          titleTextError="Error: Bedrock ID Conversion Output"
          errorText="Warning, it appears that something went wrong with the conversion of your file, please ensure that the input section is not empty."
        />
      ) : null}
    </>
  );
};
export default BedRockIDConversionButton;
