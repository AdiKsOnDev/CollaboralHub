import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar.js';
import sticky_notes from './pages/sticky_notes';


function App() {
  
  return (
    
    <Router>
      <div className="App bg-primary w-screen h-screen">
      <sticky />
        {/* <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
