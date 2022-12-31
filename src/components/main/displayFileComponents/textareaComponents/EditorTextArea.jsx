const EditorTextArea = (props) => {
    return (
        <textarea ref={props.TextAreaInputRef}
        placeholder={props.TextInputValue}/>
    )
}
export default EditorTextArea;