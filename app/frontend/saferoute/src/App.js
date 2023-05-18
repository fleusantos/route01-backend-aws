import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './map';
import About from './about';
import UsedData from './used_data';
import LoginPage from './LoginPage';


function App() {
    return (
      <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
            <Route path="/used_data" element={<UsedData />} />
          </Routes>
      </Router>
    );
}


export default App; 