import io from "socket.io-client"
import { useEffect, useState} from "react"

const socket = io.connect("http://localhost:3001")

function Question (){

    const [questionRecieved, setQuestionRecieved]= useState()

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