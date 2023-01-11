const express = require ('express')
const app= express()
const { Server } = require ('socket.io')
const http = require("http")
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket)=>{
    console.log(`user connected: ${socket.id}`)

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`${data}`)
    })
   
    socket.on("send_question", (data)=>{
        socket.to(data.pin).emit("recieve_question", data.question)
        console.log(`data.pin is ${data.pin} this is the info ${data.question}`)
    })

})

server.listen(3001 , ()=>{
    console.log("server is running now yahoo!")
})