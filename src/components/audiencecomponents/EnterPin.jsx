import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
const socket = io.connect("https://voice-it.herokuapp.com")


function EnterPin (){

    const [room, setRoom]= useState()
    const [questionRecieved, setQuestionRecieved]= useState("Hello")

    const joinRoom = ()=>{
        socket.emit("join_room", room)
        console.log(`audience joined room: ${room}`)
    }

    useEffect(()=>{
        socket.on("recieve_question", (data)=>{
            setQuestionRecieved(data)
            console.log("got here")
        })
       }, [])

 

    return (
        <div>
        <h1 className="cool">VoiceIt</h1>
        <div className="small-box">
            <p>Enter the pin</p>
            <input type="text" placeholder="pin" onChange={(event)=>setRoom(event.target.value)}/>
            <button onClick={joinRoom}>Enter</button><br></br>
            {questionRecieved}
        </div>
        </div>
        
    )
}

export default EnterPin