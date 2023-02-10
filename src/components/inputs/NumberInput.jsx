export default function NPCInput(props) {
  // Number Handler for the number of commands per NPC is adjustable due to the fickle nature of every increasing and large builds.//
  const handleUserInput = (e) => {
    props.setValueInput(`${e.target.value}`);
  };

  return (
    <div className="labelsNPC">
      <label htmlFor="NPC Input">Edit Commands per NPC:</label>
      <input
        required
        aria-label="NPC Input"
        type="number"
        onChange={handleUserInput}
        placeholder={props.valueInput}
        value={props.valueInput}
        min={120}
        max={1000}
        className="hoverYes"
      />
    </div>
  );
}
