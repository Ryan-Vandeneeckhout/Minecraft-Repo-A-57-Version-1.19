import { useRef } from "react";
import useState from "react-usestateref";
import SideMenu from "../devMenu/SideMenu";
import DevMenuOverlay from "../overlays/devMenuOverlay";
import DisplayEditComponentsContainer from "./displayEditComponentContainer";
import MainBackground from "./mainBackgroundComponents/mainBackground";

const MainFileComponent = (props) => {
  const [closeWindow, setCloseWindow] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [menuSetting, setMenuSetting] = useState("defaultMenu");
  const [loading, setLoading] = useState(
    "Get Started Converting a MineCraft Build"
  );
  const [, setFailedIdsDownload, failedIdsDownloadRef] = useState("");
  const [, setGreenWidth, greenWidthRef] = useState(1);
  const [, setGreyWidth, greyWidthRef] = useState(99);
  const [, setProgessStatus, progressStatusRef] = useState("Idle");
  const [
    ,
    setIDOutputBedRockFailedData,
    IDOutPutBedRockFailedDataRef,
  ] = useState("");
  const [, setDataConvertedStateHolder, dataConvertedStateHolderRef] = useState(
    null
  );
  const [dataBedRockOriginal, setDataBedRockOriginal] = useState(null);
  const IdDownloadRef = useRef(null);
  const contentFileOutputConversionRef = useRef(null);

  const closeWindowFunction = () => {
    setCloseWindow(!closeWindow);
  };

  function downloadFileFailedIDs() {
    const blob = new Blob(
      [
        failedIdsDownloadRef.current +
          "\n" +
          IDOutPutBedRockFailedDataRef.current,
      ],
      {
        type: "plain/text",
      }
    );
    const fileUrl = URL.createObjectURL(blob);
    IdDownloadRef.current.setAttribute("href", fileUrl);
    IdDownloadRef.current.setAttribute("download", "FailedIds.txt");
  }

  const ForceReplacementOfFailedIDs = () => {
    const rx = /\[([^\][]*)]/g;

    let cleanData = dataBedRockOriginal;

    const strs = [dataBedRockOriginal];
    strs.forEach((x) => {
      if (x.match(rx) === null);
      else {
        let matchID = [...new Set(x.match(rx))];
        matchID.forEach((x) => {
          let D = x.toString().replaceAll("\\", "");
          cleanData = cleanData.replaceAll(D, "");
          console.log(D);
        });

        setDataBedRockOriginal(cleanData);
        contentFileOutputConversionRef.current.value = cleanData;
        console.log(cleanData);
      }
    });
  };

  return (
    <main>
      <div className="wrapperMainContent">
        <DisplayEditComponentsContainer
          errorContent={errorContent}
          setErrorContent={setErrorContent}
          closeWindow={setCloseWindow}
          setFailedIdsDownload={setFailedIdsDownload}
          downloadFileFailedIDs={downloadFileFailedIDs}
          setIDOutputBedRockFailedData={setIDOutputBedRockFailedData}
          loading={loading}
          setLoading={setLoading}
          setGreyWidth={setGreyWidth}
          setProgessStatus={setProgessStatus}
          setGreenWidth={setGreenWidth}
          setDataBedRockOriginal={setDataBedRockOriginal}
          dataBedRockOriginal={dataBedRockOriginal}
          setDataConvertedStateHolder={setDataConvertedStateHolder}
          dataConvertedStateHolderRef={dataConvertedStateHolderRef}
          contentFileOutputConversionRef={contentFileOutputConversionRef}
        />
        <MainBackground
          DevMenuRef={props.DevMenuRef}
          CreditsRef={props.CreditsRef}
          EditFileContainerRef={props.EditFileContainerRef}
          sideMenuRef={props.sideMenuRef}
          loading={loading}
          greenWidthRef={greenWidthRef}
          greyWidthRef={greyWidthRef}
          progressStatusRef={progressStatusRef}
          menuSetting={menuSetting}
        />
        <SideMenu
          ResetTheme={props.ResetTheme}
          devMenuVisible={props.devMenuVisible}
          setMenuSetting={setMenuSetting}
        />
        <DevMenuOverlay
          devMenuFunction={props.devMenuFunction}
          devMenuVisible={props.devMenuVisible}
        />
        <div
          className={`errorContentIdsFoundUnconverted${
            closeWindow ? "  displayFlex" : " displayNone"
          }`}
        >
          <div className="errorContentIdsFoundUnconvertedWrapper">
            <h3>Error IDs Found Unconverted</h3>
            <p>
              Please check your converted file for unconverted Bedrock Ids. The
              build may not work correctly, Kitty Shizz is working to improve
              the list of IDs and would appreciate a notice regarding the IDs
              that remain unconverted in a DM on discord.
            </p>
            <div className="buttonContainerFlexColumn">
              <a ref={IdDownloadRef} href="download">
                Download and Fix Manually.
              </a>
              <button onClick={ForceReplacementOfFailedIDs}>
                Remove IDs and Continue:{" "}
              </button>
            </div>

            <button className="closeWindowButton" onClick={closeWindowFunction}>
              X
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MainFileComponent;
