import { useState } from "react";
import "./toggleInput.scss";

export const Toggle = ({ toggled, onClick }) => {
  //Legacy Code used to toggle on and off state, used in version 2 and lower for the editor //
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };
  return (
    <label aria-hidden="true" className="toggleInput">
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
      <span />
    </label>
  );
};
