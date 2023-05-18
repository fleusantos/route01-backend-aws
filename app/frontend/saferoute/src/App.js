import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Map from './map';
import About from './about';
import UsedData from './used_data';

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
