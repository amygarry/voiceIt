import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import AudioRecorder from "../components/audiencecomponents/AudioRecording"

const socket = io.connect("http://localhost:3021")


function ResponseScreen (){

    const [room, setRoom]= useState()
    const [questionRecieved, setQuestionRecieved]= useState("The question will show up here")
    const [page, setPage]= useState(true)

    const joinRoom = ()=>{
        socket.emit("join_room", room)
        console.log(`audience joined room: ${room}`)
        setPage(false)
    }

    useEffect(()=>{
        socket.on("recieve_question", (data)=>{
            setQuestionRecieved(data)
        })
       }, [socket])

 

    return (
        <div className="response-page">
        <h1>VoiceIt</h1>
        {page ? 
        <div className="response-boxes">
            <p>Join the Chatter Box</p>
            <input type="text" placeholder="Pin" onChange={(event)=>setRoom(event.target.value)} className="enter-pin"/>
            <button onClick={joinRoom} className="enter-pin enter">Enter</button><br></br>
        </div> :
            <div>
            <div className="response-boxes">{room ? ` you have joined room: ${room}` : "enter a pin to join the room"}</div>
            <div className="response-boxes">{questionRecieved}</div>
            <AudioRecorder room={room}/>
            </div>
        }
        
        </div>
        
    )
}

export default ResponseScreen