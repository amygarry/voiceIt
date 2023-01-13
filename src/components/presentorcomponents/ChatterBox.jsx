import { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3021")

function ChatterBox ({pin}){

    const[recordings, setRecordings] = useState([])

    useEffect(()=>{
            socket.emit("join_room", pin)
            console.log(`Chatter box joined this room : ${pin}`) 
        }, [])

    useEffect(()=>{ socket.on("recieve_audio", (data)=>{
        console.log("got here")
        console.log(data)
        setRecordings([...recordings,data])
})},[socket])

console.log(recordings)

// let recordingsDisplay = recordings.map(audio=>{<audio controls  src={audio}/>})
let recordingsDisplay = recordings.map(x=>{<h4>x</h4>})

    return (
        <div>
            <h2>ChatterBox</h2>
            {recordingsDisplay}
        </div>
    )
}

export default ChatterBox