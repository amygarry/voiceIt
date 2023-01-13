const express = require ('express')
const app= express()
const { Server } = require ('socket.io')
const {SERVER_PORT}= process.env
const http = require("http")
const cors = require('cors')
const {sequelize} = require('./util/database')

app.use(cors())
app.use(express.json())

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
        socket.join(+data)
        console.log(+data)
    })
   
    socket.on("send_question", (data)=>{
        socket.to(data.pin).emit("recieve_question", data.question)
        console.log(`data.pin is ${data.pin} this is the info ${data.question}`)
    })

    socket.on("send_audio", (data)=>{
        socket.to(+data.room).emit("recieve_audio", data.audio)
        console.log(`data.room is ${data.room} this is the info ${data.audio}`)
    })

})
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

app.post('/register', register)
app.post('/login', login)

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`db sync successful & server running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err))

server.listen(3021 , ()=>{
    console.log("server is running now yahoo!")
})