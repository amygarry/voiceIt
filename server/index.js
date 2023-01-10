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

    socket.on("join_chatterBox", (data)=>{
        socket.join(data)
    })
   
    socket.on("send_question", (data)=>{
        socket.to(data.pin).emit("recieve_question", data)
    })

})

server.listen(3001 , ()=>{
    console.log("server is running now yahoo!")
})