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
        <div className="response-page">
        <h1>VoiceIt</h1>
        <div className="response-boxes">
            <p>Join the Chatter Box</p>
            <input type="text" placeholder="Pin" onChange={(event)=>setRoom(event.target.value)} className="enter-pin"/>
            <button onClick={joinRoom} className="enter-pin enter">Enter</button><br></br>
            </div>
            <div className="response-boxes">{questionRecieved}</div>
            <AudioRecorder room={room}/>
        
        </div>
        
    )
}

export default ResponseScreen