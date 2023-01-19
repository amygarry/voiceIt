import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import AudioRecorder from "../components/audiencecomponents/AudioRecording"

const socket = io.connect("https://voice-it.herokuapp.com")


function ResponseScreen (){

    const alphabet  = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    
    

    const [room, setRoom]= useState()
    const [questionRecieved, setQuestionRecieved]= useState("The question will show up here")
    const [page, setPage]= useState(true)

    const joinRoom = ()=>{
        let roomCheck = room.split("")
        socket.emit("join_room", room)
        console.log(`audience joined room: ${room}`)
        if(room.length>3 && room.length<5){
            setPage(false)
        }else{
            alert("Pin must be 4 digits long and only contain numbers")
        }
        for (let i = 0; i < roomCheck.length; i++) {
            if(alphabet.includes(roomCheck[i])){ 
                setPage(true)
                alert("Pin must only contain numbers")
                break
            }
            
        }
        
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
            <div className="response-page">
            <div className="response-boxes">{room ? ` You have joined room: ${room}` : "enter a pin to join the room"}</div>
            <div className="response-boxes">{questionRecieved}</div>
            <AudioRecorder room={room}/>
            </div>
        }
        
        </div>
        
    )
}

export default ResponseScreen