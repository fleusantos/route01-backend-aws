import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './map';
import About from './about';
import UsedData from './used_data';

const RedirectButton = () => {  
    const handleClick = () => {
        navigate('/map');
    };
    return (
        <button onClick={handleClick}>
          Go to Map
        </button>
    );
}

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
            <Route path="/used_data" element={<UsedData />} />
          </Routes>
          <RedirectButton />
        </div>
      </Router>
    );
}


export default App; 