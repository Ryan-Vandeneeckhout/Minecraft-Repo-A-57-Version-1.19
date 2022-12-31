import { ThemeMenuButtonMap } from "./ThemeMenuButtonMap.jsx";
import ThemeMenuButton from "./ThemeMenuButton.jsx";

const ThemeMenuChanger = (props) => {
  return (
    <ul className={`themeMenu${props.themeMenuState ? "  displayFlex" : " displayNone"}`}>
      {ThemeMenuButtonMap.map((item, index) => {
        return (
          <ThemeMenuButton
            key={index}
            ButtonColor={item.ButtonColor}
            ButtonText={item.ButtonText}
            ThemeHTML={item.ThemeHTML}
          />
        );
      })}
    </ul>
  );
};

export default ThemeMenuChanger;
