import {useState, useEffect} from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import io from "socket.io-client"

const socket = io.connect("http://localhost:3021")


const AudioRecorder = ({room}) => {


  const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({audio: true})
  console.log(mediaBlobUrl)

  const [audio, setAudio]=useState()

  useEffect(()=>{
    socket.emit("join_room", room)
    console.log(`Audio joined room: ${room}`)
  },[room])

  function sendAudio (event){
      setAudio(mediaBlobUrl)
      socket.emit("send_audio", {audio, room})
  }

  return (
    <div>
      <h3>Status: <span>{status}</span></h3>
      <button onClick={status !== 'recording' ? startRecording : stopRecording}>{status !== 'recording' ? "Record" : "Stop"}</button>
      <audio controls  src={mediaBlobUrl}/>
      <button onClick={sendAudio}>Submit</button>
    </div>
  )
}

export default AudioRecorder