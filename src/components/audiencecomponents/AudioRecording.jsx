import {useState, useEffect} from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import io from "socket.io-client"
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';


const socket = io.connect("http://localhost:3021")


const AudioRecorder = ({room}) => {


  const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({audio: true})
  console.log(mediaBlobUrl)

  const [audio, setAudio]=useState()

  useEffect(()=>{
    socket.emit("join_room", room)
    console.log(`Audio joined room: ${room}`)
  },[room])

  useEffect(()=>{
    console.log(audio)
    socket.emit("send_audio", {audio, room})},[audio])

  let audioFile = new File([mediaBlobUrl], "New Audio", {lastModified: new Date().getTime(), type:"audio/mp3"})
  console.log("this is the file", audioFile)

    function boolean (){
      if (status ==='recording'){
        return true
      }else return false
    }
    

  return (
    <div className='response-boxes'>
      <button onClick={status !== 'recording' ? startRecording : stopRecording} className={status !== 'recording' ? "record" : "stop"}>{status !== 'recording' ? "Record" : "Stop"}</button>
      <Timer active={boolean()}>
      <Timecode className="enter-pin timer"/>
      </Timer>
      {mediaBlobUrl ? <audio controls  src={mediaBlobUrl}/>: <p>No audio has been recorded</p>}
      <button onClick={(event)=>{setAudio(audioFile)}} className="enter-pin">Submit</button>
    </div>
  )
}

export default AudioRecorder