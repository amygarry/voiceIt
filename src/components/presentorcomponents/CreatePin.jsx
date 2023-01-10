import { useState, useEffect } from "react"
import io from "socket.io-client"



const socket = io.connect("http://localhost:3001")

function PinNumber (){

    const [room, setRoom]=useState((Math.floor(1000 + Math.random() * 9000)))

    
    console.log(room)
   
  
    useEffect(()=>{
        socket.emit("join_room", room)
        console.log(`joined room : ${room}`) 
    }, [])


    return (
        <div>
        <div>{room}</div>
        </div>
    )
}

export default PinNumber