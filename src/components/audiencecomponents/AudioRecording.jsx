import {useState, useEffect} from 'react'
import io from "socket.io-client"
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import MicRecorder from 'mic-recorder-to-mp3'
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import storage from "../../firebaseConfig";

const socket = io.connect("https://voice-it.herokuapp.com")

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const AudioRecorder = ({room}) => {

  const [audio, setAudio]=useState()
  const [isRecording, setIsRecording] = useState(false)
  const [blob, setblob] = useState("")
  const [isBlocked, setIsBlocked] = useState(false)

  const  makeid = async (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  

    const handleUpload = async () => {
      let name = await makeid(10)
          try {
            // let file = new File([blob], `audio.mp3}`)
            const storageRef = await ref(storage, `/audio/${name}.mp3`);
            console.log("Ref: ",storageRef)
            const snapshot = await uploadBytes(storageRef, blob);
            console.log("Snap: ", snapshot);
            const url = await getDownloadURL(snapshot.ref);
            console.log(url)
            socket.emit("send_audio", {url, room})
            return url
          } catch (err) {
            console.log(err);
          }
        }

      const startRecording = () => {
          if (isBlocked) {
            console.log('Permission Denied');
          } else {
            Mp3Recorder
              .start()
              .then(() => {
                setIsRecording(true)
              }).catch((e) => console.error(e));
          }
        }
      const stopRecording = () => {
          Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const bloburl = URL.createObjectURL(blob)
            setAudio(bloburl)
            setblob(blob)
            setIsRecording(false)
          }).catch((e) => console.log(e));
        }

  useEffect(()=>{
    socket.emit("join_room", room)
  },[room])

  return (
    <div className='response-boxes'>
      <button onClick={!isRecording ? startRecording : stopRecording} className={!isRecording ? "record" : "stop"}>{!isRecording? "Record" : "Stop"}</button>
      <Timer active={isRecording}>
      <Timecode className="enter-pin timer"/>
      </Timer>
    {audio ? <audio controls  src={audio}/>: <p>No audio has been recorded</p>}
      <button onClick={handleUpload} className="enter-pin">Submit</button>
    </div>
  )
}

export default AudioRecorder