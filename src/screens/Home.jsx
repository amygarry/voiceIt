import {Link} from "react-router-dom"

function Home (){
    return(
        <div className="home-page">
        <h1 className="home-name">VoiceIt</h1>
        <div className="welcome">Create interactive lessons and presentations where you give your learners a voice. Ask questions and then let them engage by submitting a sound clip of their response. </div>
        <div className="home-nav">
        <button className="home-buttons"><Link to='/respond'>Join a session</Link></button>
        <button className="home-buttons"><Link to='/login'>Signup/Login</Link></button>
        </div>
        </div>

    )
}

export default Home