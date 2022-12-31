import { useRef } from "react";
import ColorInput from "../../inputs/ColorInput";

const ThemeMenuCreation = (props) => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="infomationMenuSection">
      <div className="infomationMenuWrapper">
        <div className="upperContent">
          <h2>Theme Creation Menu</h2>
        </div>
        <div className="middleContent">
          <form>
            <ColorInput
              labelText={"Main Menu Background Color"}
              StateRef={sectionRef}
              ColorDataName="mainMenuTheme"
            />
            <ColorInput
              labelText={"Credits Background Color"}
              StateRef={props.CreditsRef}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
export default ThemeMenuCreation;
