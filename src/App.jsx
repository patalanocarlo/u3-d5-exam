import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './Components/NavBar';
import Home from './Components/Home';
import Meteo from './Components/Meteo';
import MeteoSpecifico from './Components/MeteoSpecifico'; 
import './App.css'; 
import SearchBar from './Components/SearchBar'; 
function App() {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/meteo" element={<Meteo />} />
          <Route path="/meteo-specifico/:city" element={<MeteoSpecifico />} /> 
          <Route path="/search" element={<SearchBar />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;