import logo from './logo.svg';
import './App.css';
import Login from './component/User/Login';
import Wheather from './component/Weatherforecast/weather';
import { Route,Routes } from 'react-router-dom';

function App() {
  
  return <>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/wheather' element={<Wheather/>}/>
  </Routes>
  </>
}

export default App;
