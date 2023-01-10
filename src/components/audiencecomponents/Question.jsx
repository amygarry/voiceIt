import io from "socket.io-client"
import { useEffect, useState} from "react"

const socket = io.connect("http://localhost:3001")

function Question ({pin}){

    const [questionRecieved, setQuestionRecieved]= useState()

    useEffect(()=>{
        socket.emit("join_room", pin)
        console.log(`audience joined question in this room : ${pin}`) 
    }, [])

    useEffect(()=>{
        socket.on("recieve_question", (data)=>{
            setQuestionRecieved(data.question)
            console.log(data.question)
        })
       }, [socket])

    return (
        <div>
            {questionRecieved}
        </div>
    )
}

export default Question