import { useRef } from "react";
import { useState } from "react";
import ColorInput from "../../inputs/ColorInput";

const ThemeMenuCreation = (props) => {
  const sectionRef = useRef(null);
  const [tagsarray, setTagsArray] = useState([]);
  return (
    <section ref={sectionRef} className="infomationMenuSection">
      <div className="infomationMenuWrapper">
        <div className="upperContent">
          <h2>Theme Creation Menu</h2>
        </div>
        <div className="middleContent">
          <form>
            <ColorInput
              tagsarray={tagsarray}
              labelText={"Main Menu Background Color"}
              StateRef={sectionRef}
              setTagsArray={setTagsArray}
              ColorDataName="mainMenuTheme"
            />
            <ColorInput
              tagsarray={tagsarray}
              setTagsArray={setTagsArray}
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
