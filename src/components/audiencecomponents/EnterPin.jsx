import { useState } from "react"
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")


function EnterPin (){

    const [room, setRoom]= useState()

    const joinRoom = ()=>{
        socket.emit("join_room", room)
        console.log(`joined room: ${room} from the user`)
    }

    return (
        <div>
        <h1>VoiceIt</h1>
        <div>
            <p>Enter the pin</p>
            <input type="text" placeholder="username" onChange={(event)=>setRoom(event.target.value)}/>
            <button onClick={joinRoom}>Enter</button>
        </div>
        </div>
        
    )
}

export default EnterPin