import { SideMenuMainMenuButtonMap } from "./SideMenuMainMenuButtonMap.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenuMainMenu = (props) => {
  return (
    <ul>
      {SideMenuMainMenuButtonMap.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              props.setMainMenu(false);
              props.setThemeMenu(item.ThemeSetting === "true");
              props.setMusicMenu(item.MusicSetting === "true");
            }}
          >
            <span>
              <FontAwesomeIcon
                className="menuItem fontAweIconSideMenu"
                icon={[`${item.IconPicturePrefix}`, `${item.IconPicture}`]}
              />
              {item.ButtonText}
            </span>
            <FontAwesomeIcon
              className="iconsBottom"
              icon={[`${item.IconArrowPreFix}`, `${item.IconArrow}`]}
            />
          </button>
        );
      })}
    </ul>
  );
};

export default SideMenuMainMenu;
