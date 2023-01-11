import { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

function ChatterBox ({pin}){


    useEffect(()=>{
        socket.emit("join_room", pin)
        console.log(`Chatter box joined this room : ${pin}`) 
    }, [])


    return (
        <div>
            <h2>ChatterBox</h2>
        </div>
    )
}

export default ChatterBox