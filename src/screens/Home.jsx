import {Link} from "react-router-dom"

function Home (){
    return(
        <div>
        <h1>VoiceIt</h1>
        <div>Create interactive lessons and presentations where you give your learners a voice. Ask questions and then let them engage by submitting a sound clip of their response. </div>
        <Link>Signup/Login</Link>
        <Link to='/respond'>Join a session</Link>
        </div>

    )
}

export default Home