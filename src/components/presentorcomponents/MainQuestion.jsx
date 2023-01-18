import io from "socket.io-client"
import { useState, useEffect } from "react"

const socket = io.connect("https://voice-it.herokuapp.com/")

function MainQuestion ({pin}){

const [question, setQuestion]= useState("asdf")

    useEffect(()=>{
        socket.emit("join_room", pin)
        console.log(`main question joined this room : ${pin}`) 
    }, [])

    const sendQuestion = (event)=>{
        setQuestion(event.target.value)
        socket.emit("send_question", {question, pin})
    }

 
    return (
    
        <input placeholder="Type your question here e.g. Got Milk" onChange={sendQuestion} className="enter-pin question"/> 
    )
}

export default MainQuestion