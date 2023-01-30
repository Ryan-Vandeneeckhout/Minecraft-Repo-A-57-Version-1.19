import { useState } from "react";
import { useAuthContext } from "../../firebase/useAuthContext.js";
import ProgressBarWidth from "../../inputs/ProgressBarWidth.jsx";
import LoginPage from "../LoginPage.jsx";
import InfomationMenu from "./infomationMenu.jsx";
import LocalMachineFile from "./LocalMachineFile.jsx";

import SignedInAdminMenu from "./signedInAdminMenu.jsx";
import ThemeMenuCreation from "./themeMenuCreation.jsx";

const MainBackground = (props) => {
  const { user, authIsReady } = useAuthContext();
  const [menuSetting] = useState("defaultMenu");

  const renderMenuSetting = () => {
    if (menuSetting === "infomationMenu") {
      return <InfomationMenu />;
    }

    if (menuSetting === "adminMenu") {
      return (
        <div className="wrapperAdminMenu">
          <h2>Adminstator Menu for Site and Global Settings</h2>
          {authIsReady && (user ? <SignedInAdminMenu /> : <LoginPage />)}
        </div>
      );
    }
    if (menuSetting === "localMenu") {
      return <LocalMachineFile />;
    }
    if (menuSetting === "themeMenu") {
      return (
        <ThemeMenuCreation
          EditFileContainerRef={props.EditFileContainerRef}
          sideMenuRef={props.sideMenuRef}
          CreditsRef={props.CreditsRef}
          DevMenuRef={props.DevMenuRef}
        />
      );
    } else {
      return (
        <div className="mainBackgroundWrapper">
          <h1>Status: {props.progressStatusRef.current}</h1>
          <ProgressBarWidth
            widthGrey={props.greyWidthRef.current}
            widthGreen={props.greenWidthRef.current}
          />
          <h3>{props.loading}</h3>
        </div>
      );
    }
  };

  return (
    <section className="mainBackgroundSection">{renderMenuSetting()}</section>
  );
};
export default MainBackground;
