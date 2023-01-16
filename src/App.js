import "./App.scss";
import "./sass/style.scss";
import { useState, useRef, useEffect } from "react";
import DevMenu from "./components/header/devMenu/DevMenu";
import MainFileComponent from "./components/main/mainFileComponent";
import Footer from "./components/footer/Footer";

function App() {
  const [devMenuVisible, setMenuVisible] = useState(false);
  const NavBarRef = useRef(null);
  const EditFileContainerRef = useRef(null);
  const SideMenuRef = useRef(null);
  const DevMenuRef = useRef(null);
  const CreditsRef = useRef(null);
  const RefList = [NavBarRef.current, CreditsRef.current];

  const devMenuFunction = () => {
    setMenuVisible((devMenuVisible) => !devMenuVisible);
  };
  //Check local browser storage for user settings
  let htmlElement = document.documentElement;
  htmlElement.setAttribute(
    "data-theme",
    window.localStorage.getItem("dataTheme")
  );
  //Reset theme to defaults if user selects a prefab design
  const ResetTheme = () => {
    if (htmlElement.getAttribute("data-theme") === "custom") {
      //Loop for custom theme from local storage
      let customTheme = "purple";
      themeStateElements(customTheme);
    } else {
      // Change background components to prefab theme
      let customTheme = "";
      themeStateElements(customTheme);
    }
  };

  const themeStateElements = (customTheme) => {
    for (let i in RefList) {
      RefList[i].style.backgroundColor = `${customTheme}`;
    }
    return;
  };

  useEffect(() => {
    const onPageLoad = () => {
      const RefListv = [NavBarRef.current, CreditsRef.current];
      if (htmlElement.getAttribute("data-theme") === "custom") {
        for (let i in RefListv) {
          RefListv[i].style.backgroundColor = "purple";
        }
      }
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [htmlElement]);

  return (
    <div className="App">
      <header ref={NavBarRef} className="appHeader">
        {/* May add additionial nav elements in a future update */}
        <nav>
          <ul>
            <li>MINECRAFT NPC CONVERTOR</li>
          </ul>
          <DevMenu
            devMenuFunction={devMenuFunction}
            devMenuVisible={devMenuVisible}
            DevMenuRef={DevMenuRef}
          />
        </nav>
      </header>
      {/* Main Meat of site - edit components, file view and landing background element */}
      <MainFileComponent
        devMenuFunction={devMenuFunction}
        devMenuVisible={devMenuVisible}
        DevMenuRef={DevMenuRef}
        EditFileContainerRef={EditFileContainerRef}
        CreditsRef={CreditsRef}
        sideMenuRef={SideMenuRef}
        ResetTheme={ResetTheme}
      />
      <Footer CreditsRef={CreditsRef} />
    </div>
  );
}

export default App;
