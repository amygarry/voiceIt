import {useState, useContext} from 'react'
import axios from "axios"
import AuthContext from '../store/authContext'
 
const SignIn = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
   

   const submitHandler = e => {
       e.preventDefault()
       const body = {
        username,
        password
    }

    console.log(body)

    const url = 'https://voice-it.herokuapp.com'

    axios.post(register ? `${url}/register` : `${url}/login`, body)
        .then((res) => {
            console.log('AFTER AUTH', res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
            
        })
        .catch(err => {
            setPassword('')
            setUsername('')
            console.log(err)
        })
       console.log('submitHandler called')

    
   }
 
   function passwordUpdate (e){
        setPassword(e.target.value)
        // console.log(password)
   }

   function usernameUpdate (e){
    setUsername(e.target.value)
    // console.log(username)
}

    function registerUpdate(){
        if(register){
            setRegister(false)
        }else(
            setRegister(true)
        )
       
        // console.log(register)
    }

   return (
       <main className='home-page'>
           <h1>VoiceIt</h1>
           <div className='response-boxes'>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='enter-pin'
                   type='text'
                   placeholder='username'
                   value={username}
                   onChange={usernameUpdate} />
               <input
                   className='enter-pin'
                   type='text'
                   placeholder='password'
                   value={password}
                   onChange={passwordUpdate} />
               <button className='enter-pin'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           </div>
           <button className='enter-pin'
           onClick={registerUpdate}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default SignIn