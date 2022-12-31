import SideMenu from "../devMenu/SideMenu";
import DevMenuOverlay from "../overlays/devMenuOverlay";
import DisplayEditComponentsContainer from "./displayEditComponentContainer";
import MainBackground from "./mainBackgroundComponents/mainBackground";

const MainFileComponent = (props) => {
  return (
    <main>
      <div className="wrapperMainContent">
        <DisplayEditComponentsContainer />
        <MainBackground DevMenuRef={props.DevMenuRef} CreditsRef={props.CreditsRef}  EditFileContainerRef={props.EditFileContainerRef}
        sideMenuRef={props.sideMenuRef}/>
        <SideMenu devMenuVisible={props.devMenuVisible} />
        <DevMenuOverlay
          devMenuFunction={props.devMenuFunction}
          devMenuVisible={props.devMenuVisible}
        />
      </div>
    </main>
  );
};
export default MainFileComponent;
