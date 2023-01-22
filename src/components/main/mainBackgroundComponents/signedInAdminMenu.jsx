import { useCollection } from "../../firebase/useFirestoreDatabase.js";
import { useRef } from "react";
import useState from "react-usestateref";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignedInAdminMenu = () => {
  const { databaseFirestore } = useCollection("MissingIds");
  const [, setValueIdsRef, valueIdsRef] = useState(null);
  const [, setValueIdsRefD, valueIdsRefD] = useState([]);
  const [downloadButtonShow, setDownloadButtonShow] = useState(false);
  const AdminDownloadIDsRef = useRef(null);

  function downloadFileFailedIDs() {
    const blob = new Blob([valueIdsRefD.current], {
      type: "plain/text",
    });
    const fileUrl = URL.createObjectURL(blob);
    AdminDownloadIDsRef.current.setAttribute("href", fileUrl);
    AdminDownloadIDsRef.current.setAttribute("download", "FailedIds.txt");
  }

  const renderFunction = () => {
    if (AdminDownloadIDsRef.current === null);
    else {
      downloadFileFailedIDs();
    }
  };

  const renderIDsCollection = () => {
    if (databaseFirestore === null) {
      return <p>No IDs found for now.</p>;
    } else {
      setDownloadButtonShow(true);
      setValueIdsRef(databaseFirestore[0].IdCollection);
      valueIdsRef.current.forEach((i) => {
        setValueIdsRefD([...valueIdsRefD.current, i + " \n"]);
      });
      renderFunction();
    }
  };

  return (
    <div className="SignedInAdminMenu">
      <h2>Community IDs found:</h2>

      <div className="downloadIDsContainer">
        <button onClick={renderIDsCollection}>Click to Render Download </button>

        <a
          className={`downloadButtonAdmin${
            downloadButtonShow ? "  displayFlex" : " displayNone"
          }`}
          ref={AdminDownloadIDsRef}
          href="download"
        >
          Download List of Unconverted Ids Found{" "}
          <span className="marginRightClass">
            <FontAwesomeIcon className="fontAweIcon" icon="fa-download" />
          </span>
        </a>
      </div>
    </div>
  );
};
export default SignedInAdminMenu;
