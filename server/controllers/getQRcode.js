const path =require ("path")

module.exports = {
    qrcode: (req,res)=>{
        res.sendFile(path.join(__dirname, "../../VoiceIt.png"))
    }
}