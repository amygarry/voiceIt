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
        // FileReader.prototype.readAsArrayBuffer(data)
        setRecordings([...recordings,data])
        console.log(recordings)
})},[recordings])




let recordingsDisplay = recordings.map(audio=>{return <audio controls src={audio} className="chatterbox-audio"/>})

    return (
        <div>
            <h1>ChatterBox</h1>
            <div className="chatter-box">{recordingsDisplay}</div>
        </div>
    )
}

export default ChatterBox