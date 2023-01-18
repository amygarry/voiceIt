import React, { useState, useEffect } from "react"

const BlobPlayer = ({ audio }) => {
    const [playing, setPlaying] = useState(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false))
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false))
        }
    }, [])

    return (
        <div>
            <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
        </div>
    )
}

export default BlobPlayer