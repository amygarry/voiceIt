import { useState, useEffect } from "react"
import io from "socket.io-client"
import MainQuestion from "../components/presentorcomponents/MainQuestion"
import ChatterBox from "../components/presentorcomponents/ChatterBox"

const socket = io.connect("http://localhost:3001")


function PresenterScreen (){

    const [room, setRoom]=useState((Math.floor(1000 + Math.random() * 9000)))

    console.log(room)

    return (
        <div>
        <MainQuestion pin={room}/>
        <div>{room}</div>
        <ChatterBox pin={room}/>
        </div>
    )
}

export default PresenterScreen