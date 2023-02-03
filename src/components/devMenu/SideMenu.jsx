import { useState } from "react";
import "./SideMenu.scss";
import SideMenuMainMenu from "./SideMenuMainMenu";
import ThemeMenuChanger from "../devMenu/themeMenu/ThemeMenuChanger.jsx";

const SideMenu = (props) => {
  const [mainMenushow, setMainMenu] = useState(true);
  const [themeMenuState, setThemeMenu] = useState(false);
  const [musicMenuState, setMusicMenu] = useState(false);

  return (
    <section
      className={`sideMenu${
        props.devMenuVisible ? " smoothClosed" : " smoothShown"
      }`}
    >
      <ul
        className={`mainMenu${mainMenushow ? " displayFlex" : " displayNone"}`}
      >
        <SideMenuMainMenu
          setMainMenu={setMainMenu}
          setThemeMenu={setThemeMenu}
          setMusicMenu={setMusicMenu}
          setMenuSetting={props.setMenuSetting}
          musicMenuState={musicMenuState}
        />
      </ul>

      <button
        className={`${mainMenushow ? " displayNone" : " displayFlex"}`}
        onClick={() => {
          setMainMenu(true);
          setThemeMenu(false);
          setMusicMenu(false);
        }}
      >
        Main Menu
      </button>
      {themeMenuState && (
        <ThemeMenuChanger
          ResetTheme={props.ResetTheme}
          themeMenuState={themeMenuState}
        />
      )}
    </section>
  );
};
export default SideMenu;
