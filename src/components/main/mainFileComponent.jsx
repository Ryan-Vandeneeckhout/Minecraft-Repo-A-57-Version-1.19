import { useState } from "react";
import SideMenu from "../devMenu/SideMenu";
import DevMenuOverlay from "../overlays/devMenuOverlay";
import DisplayEditComponentsContainer from "./displayEditComponentContainer";
import MainBackground from "./mainBackgroundComponents/mainBackground";

const MainFileComponent = (props) => {
  const [closeWindow, setCloseWindow] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const closeWindowFunction = () => {
    setCloseWindow(!closeWindow);
  };
  return (
    <main>
      <div className="wrapperMainContent">
        <DisplayEditComponentsContainer
          errorContent={errorContent}
          setErrorContent={setErrorContent}
          closeWindow={setCloseWindow}
        />
        <MainBackground
          DevMenuRef={props.DevMenuRef}
          CreditsRef={props.CreditsRef}
          EditFileContainerRef={props.EditFileContainerRef}
          sideMenuRef={props.sideMenuRef}
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
            <a href="download">Download List of Unconverted Ids Found</a>
            <button onClick={closeWindowFunction}>Close Window</button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MainFileComponent;
