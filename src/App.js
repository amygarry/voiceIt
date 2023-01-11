import './App.css';
import { Routes, Route } from 'react-router-dom'
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
        <Route path='/present' element={<PresenterScreen/>}/>
        <Route path='/respond' element ={<ResponseScreen/>}/>
        <Route path='/login' element ={<SignIn/>}/>
     </Routes>
    </div>
  );
}

export default App;
