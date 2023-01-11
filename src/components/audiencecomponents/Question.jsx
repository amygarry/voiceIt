import io from "socket.io-client"
import { useEffect, useState} from "react"

const socket = io.connect("http://localhost:3001")

function Question ({pin}){

    const [questionRecieved, setQuestionRecieved]= useState("Hello")

    useEffect(()=>{
        socket.on("recieve_question", (data)=>{
            setQuestionRecieved(data)
            console.log(data)
        })
       }, [socket])
       
    useEffect(()=>{
        socket.emit("join_room", pin)
        console.log(`audience joined question in this room : ${pin}`) 
    }, [])



    return (
        <div>
            {questionRecieved}
        </div>
    )
}

export default Question