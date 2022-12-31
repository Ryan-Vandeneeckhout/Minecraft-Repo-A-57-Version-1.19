import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useCollection } from "../../firebase/useFirestoreDatabase.js";
import LoginPage from "../LoginPage.jsx";
import InfomationMenu from "./infomationMenu.jsx";
import { ButtonMapMainBackground } from "./menuComponents/menuComponentButtonMaps/buttonMapMainBackground.jsx";
import ThemeMenuCreation from "./themeMenuCreation.jsx";

const MainBackground = (props) => {
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
          <LoginPage />
        </div>
      );
    }
    if (menuSetting === "localMenu") {
      return (
        <div className="localMachineMenu">
          <h2>Local Machine Conversion Custom</h2>
        </div>
      );
    }
    if (menuSetting === "themeMenu") {
      return (
        <ThemeMenuCreation CreditsRef={props.CreditsRef} DevMenuRef={props.DevMenuRef}/>
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
