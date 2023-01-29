import { useRef } from "react";
import useState from "react-usestateref";
import SideMenu from "../devMenu/SideMenu";
import DevMenuOverlay from "../overlays/devMenuOverlay";
import DisplayEditComponentsContainer from "./displayEditComponentContainer";
import MainBackground from "./mainBackgroundComponents/mainBackground";

const MainFileComponent = (props) => {
  const [closeWindow, setCloseWindow] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [loading, setLoading] = useState(
    "Get Started Converting a MineCraft Build"
  );
  const [, setFailedIdsDownload, failedIdsDownloadRef] = useState("");
  const IdDownloadRef = useRef(null);

  const closeWindowFunction = () => {
    setCloseWindow(!closeWindow);
  };

  function downloadFileFailedIDs() {
    const blob = new Blob([failedIdsDownloadRef.current], {
      type: "plain/text",
    });
    const fileUrl = URL.createObjectURL(blob);
    IdDownloadRef.current.setAttribute("href", fileUrl);
    IdDownloadRef.current.setAttribute("download", "FailedIds.txt");
  }

  return (
    <main>
      <div className="wrapperMainContent">
        <DisplayEditComponentsContainer
          errorContent={errorContent}
          setErrorContent={setErrorContent}
          closeWindow={setCloseWindow}
          setFailedIdsDownload={setFailedIdsDownload}
          downloadFileFailedIDs={downloadFileFailedIDs}
          loading={loading}
          setLoading={setLoading}
        />
        <MainBackground
          DevMenuRef={props.DevMenuRef}
          CreditsRef={props.CreditsRef}
          EditFileContainerRef={props.EditFileContainerRef}
          sideMenuRef={props.sideMenuRef}
          loading={loading}
        />
        <SideMenu
          ResetTheme={props.ResetTheme}
          devMenuVisible={props.devMenuVisible}
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
            <a ref={IdDownloadRef} href="download">
              Download List of Unconverted Ids Found
            </a>
            <button onClick={closeWindowFunction}>Close Window</button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MainFileComponent;
