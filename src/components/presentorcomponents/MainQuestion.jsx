import io from "socket.io-client"
import { useState } from "react"

const socket = io.connect("http://localhost:3001")

function MainQuestion (){

const [question, setQuestion]= useState("asdf")

    const sendQuestion = (event)=>{
        setQuestion(event.target.value)
        socket.emit("send_question", {question})
    }
 
    return (
    
        <input placeholder="Type your question here e.g. Got Milk" onChange={sendQuestion}/> 
    )
}

export default MainQuestion