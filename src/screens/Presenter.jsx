import { useState, useEffect, useContext } from "react"
import io from "socket.io-client"
import MainQuestion from "../components/presentorcomponents/MainQuestion"
import ChatterBox from "../components/presentorcomponents/ChatterBox"
import AuthContext from '../store/authContext'

const socket = io.connect("http://localhost:3021")


function PresenterScreen (){

    const authCtx = useContext(AuthContext)

    const [room, setRoom]=useState((Math.floor(1000 + Math.random() * 9000)))

    console.log(room)

    return (
        <span>
        <h1 className="bigger">VoiceIt</h1>
        <MainQuestion pin={room}/>
        <div className="box"> 
        <div className="center">
        <h1 className="response-boxes pin">VoiceIt.com</h1>
        <div className="response-boxes pin">{room}</div>
        </div>
        <ChatterBox pin={room}/>
        </div>
        <button onClick={() => authCtx.logout()} className="enter-pin">Logout</button>
        </span>
    )
}

export default PresenterScreen