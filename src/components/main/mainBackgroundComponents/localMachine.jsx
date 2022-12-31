import TextObjectInput from "../../inputs/TextObjectInput";

const localMachine = () => {


    return (
        <section>
            <div className="localMachineWrapper">
                <div className="upperContent">
                    <h3>Local Machine Menu</h3>
                </div>
                <div className="middleContent">
                    <form>
                        <TextObjectInput />
                    </form>
                </div>
            </div>
        </section>
    )
}
export default localMachine;