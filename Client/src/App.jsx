import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import HomeScreen from './screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen'
import Registerscreen from './screens/Registerscreen'
import Loginscreen from './screens/Loginscreen'
import Profilescreen from './screens/Profilescreen'
import Adminscreen from './screens/Adminscreen'
import Landingscreen from './screens/Landingscreen'


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen/>} />
          <Route path="/book/:roomid/:fromdate/:todate"  element={<Bookingscreen/>}/>
          <Route path="/register"  element={<Registerscreen/>}/>
          <Route path="/login"  element={<Loginscreen/>}/>
          <Route path="/profile"  element={<Profilescreen/>}/>
          <Route path="/admin"  element={<Adminscreen/>}/>
          <Route path="/"  element={<Landingscreen/>}/>
          {/* <Route path='/home' exact Component={HomeScreen}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;



/// new code


