import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import AudioRecorder from "../components/audiencecomponents/AudioRecording"

const socket = io.connect("http://localhost:3021")


function ResponseScreen (){

    const [room, setRoom]= useState()
    const [questionRecieved, setQuestionRecieved]= useState("You have not joined a room yet. Enter a pin to join a room")

    const joinRoom = ()=>{
        socket.emit("join_room", room)
        console.log(`audience joined room: ${room}`)
    }

    useEffect(()=>{
        socket.on("recieve_question", (data)=>{
            setQuestionRecieved(data)
        })
       }, [socket])

 

    return (
        <div>
        <h1>VoiceIt</h1>
        <div>
            <p>Enter the pin</p>
            <input type="text" placeholder="pin" onChange={(event)=>setRoom(event.target.value)}/>
            <button onClick={joinRoom}>Enter</button><br></br>
            {questionRecieved}
            <AudioRecorder room={room}/>
        </div>
        </div>
        
    )
}

export default ResponseScreen