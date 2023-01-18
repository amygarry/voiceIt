import { useState, useEffect } from "react"
import io from "socket.io-client"
import BlobPlayer from "./BlobPlayer"

const socket = io.connect("http://localhost:3021")

function ChatterBox ({pin}){

    const[recordings, setRecordings] = useState([])
    const []=useState()

    useEffect(()=>{
            socket.emit("join_room", pin)
            console.log(`Chatter box joined this room : ${pin}`) 
        }, [])

    useEffect(()=>{ socket.on("recieve_audio", (data)=>{
        console.log(data)
        setRecordings([...recordings, data])
       
})},[recordings])

console.log(recordings)


let recordingsDisplay = recordings.map(audio=>{

  
    return <audio src={audio} controls/>
 })
console.log(recordingsDisplay)
    // return <audio src={`[${audio}]`} controls type="audio/webm"/>})

    return (
        <div>
            <h1>ChatterBox</h1>
            <div className="chatter-box">{recordingsDisplay}</div>
        </div>
    )
}

export default ChatterBox