import Credits from "./Credits.jsx";

const Footer = (props) => {
  return (
    <footer ref={props.CreditsRef}>
      <Credits />
    </footer>
  );
};
export default Footer;
