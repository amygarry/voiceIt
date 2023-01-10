import './App.css';
import { Routes, Route } from 'react-router-dom'

import ResponseScreen from './screens/Response';
import PresenterScreen from './screens/Presenter';


function App() {
  return (
    <div className="App">
      {/* <PresenterScreen/>
      <ResponseScreen/> */}
     <Routes>
        <Route path='/present' element={<PresenterScreen/>}/>
        <Route path='/respond' element ={<ResponseScreen/>}/>
     </Routes>
    </div>
  );
}

export default App;
