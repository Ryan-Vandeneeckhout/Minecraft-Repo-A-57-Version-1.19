import { useState } from "react";

const DataIdStringInput = (props) => {
  // Legacy code may be reimplenmented in a a future update regarding the creation of custom strings from the user's local machine//
  const [dataID, setDataID] = useState(null);

  const LocalMachineData = (e) => {
    e.preventDefault();
    window.localStorage.setItem("InputDataLocal", dataID);
  };
  return (
    <form onSubmit={LocalMachineData}>
      <label htmlFor="Data-STring-Id-Input">{props.labelText}</label>
      <input
        aria-label="Data-Strng-Id-Input"
        type="text"
        placeholder="Insert Data Here"
        onChange={(e) => {
          setDataID(e.target.value);
        }}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DataIdStringInput;
