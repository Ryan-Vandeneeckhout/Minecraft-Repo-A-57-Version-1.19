import "./App.scss";
import "./sass/style.scss";
import { useState, useRef } from "react";
import DevMenu from "./components/header/devMenu/DevMenu";
import MainFileComponent from "./components/main/mainFileComponent";
import Footer from "./components/footer/Footer";

function App() {
  const [devMenuVisible, setMenuVisible] = useState(false);
  const NavBarRef = useRef(null);
  const EditFileContainerRef = useRef(null); 
  const sideMenuRef = useRef(null); 
  const DevMenuRef = useRef(null); 
  const CreditsRef = useRef(null); 

  const devMenuFunction = () => {
    setMenuVisible((devMenuVisible) => !devMenuVisible);
  };
  let htmlElement = document.documentElement;
  htmlElement.setAttribute(
    "data-theme",
    window.localStorage.getItem("dataTheme")
  );

  if (htmlElement.getAttribute("data-theme") === "custom") {
    if (!NavBarRef.current); 

    else { 
      NavBarRef.current.style.backgroundColor = "white";
      CreditsRef.current.style.backgroundColor = "white";
    }
  }

  return (
    <div className="App">
      <header ref={NavBarRef} className="appHeader">
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
      <MainFileComponent
        devMenuFunction={devMenuFunction}
        devMenuVisible={devMenuVisible}
        DevMenuRef={DevMenuRef}
        CreditsRef={CreditsRef}
      />
      <Footer CreditsRef={CreditsRef} />
    </div>
  );
}

export default App;
