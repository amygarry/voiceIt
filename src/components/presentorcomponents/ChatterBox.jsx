import io from "socket.io-client"

const socket = io.connect("http://localhost:3001")

function ChatterBox (){
    return (
        <div>
            <h2>ChatterBox</h2>
        </div>
    )
}

export default ChatterBox