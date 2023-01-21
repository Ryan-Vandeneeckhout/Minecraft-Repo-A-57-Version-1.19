import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuthContext } from "../../firebase/useAuthContext.js";
import { useCollection } from "../../firebase/useFirestoreDatabase.js";
import LoginPage from "../LoginPage.jsx";
import InfomationMenu from "./infomationMenu.jsx";
import LocalMachineFile from "./LocalMachineFile.jsx";

import { ButtonMapMainBackground } from "./menuComponents/menuComponentButtonMaps/buttonMapMainBackground.jsx";
import SignedInAdminMenu from "./signedInAdminMenu.jsx";
import ThemeMenuCreation from "./themeMenuCreation.jsx";

const MainBackground = (props) => {
  const { user, authIsReady } = useAuthContext();
  const { databaseFirestore } = useCollection("npcTestConnection");
  const [menuSetting, setMenuSetting] = useState("defaultMenu");

  const renderFireBaseDatabase = () => {
    return databaseFirestore ? (
      <span className="greenText">{databaseFirestore[0].testConnection}</span>
    ) : (
      <span className="redText">Not Connected</span>
    );
  };

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
          <h1>Minecraft NPC Convertor Version 2</h1>
          <h2>NPC Database Status: {renderFireBaseDatabase()}</h2>
        </div>
      );
    }
  };

  return (
    <section className="mainBackgroundSection">
      <ul>
        {ButtonMapMainBackground.map((item, index) => {
          return (
            <button
              onClick={() => setMenuSetting(item.ButtonValue)}
              key={index}
              style={{ backgroundColor: item.ButtonColor, color: "white" }}
            >
              <FontAwesomeIcon icon={item.ButtonText} />
            </button>
          );
        })}
      </ul>
      {renderMenuSetting()}
    </section>
  );
};
export default MainBackground;
