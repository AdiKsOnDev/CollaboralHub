import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { fireApp } from './firebase.js';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StickyN from './pages/sticky_notes.js';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-full">
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/sticky_notes" element={<StickyN />} />
          <Route path="/Canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;