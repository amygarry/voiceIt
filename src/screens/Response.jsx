import Question from "../components/audiencecomponents/Question"
import EnterPin from "../components/audiencecomponents/EnterPin"

function ResponseScreen (){
    return (
        <div>
        <h1>VoiceIt</h1>
        <EnterPin/>
        <Question/>
        </div>
        
    )
}

export default ResponseScreen