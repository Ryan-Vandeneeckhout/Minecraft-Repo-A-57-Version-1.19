import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DownloadFileInput = (props) => {
  return (
    <>
      <a
        href="defaultURL"
        ref={props.downloadFileRef}
        className="downloadButton blueB DisplayNone hoverYes"
      >
        {" "}
        <span>
          <FontAwesomeIcon className="fontAweIcon" icon="fa-download" />
        </span>
        {props.downloadText}
      </a>
    </>
  );
};
export default DownloadFileInput;
