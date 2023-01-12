import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './store/authContext';

import Home from './screens/Home';
import ResponseScreen from './screens/Response';
import PresenterScreen from './screens/Presenter';
import SignIn from './screens/SignIn';


function App() {

  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/present' element={authCtx.token ? <PresenterScreen/>: <Navigate to="/login"/>}/>
        <Route path='/respond' element ={<ResponseScreen/>}/>
        <Route path='/login' element ={!authCtx.token ? <SignIn/> : <Navigate to='/present'/>}/>
     </Routes>
    </div>
  );
}

export default App;
