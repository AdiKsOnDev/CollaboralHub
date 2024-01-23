import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { fireApp } from './firebase.js';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Canvas from './pages/Canvas';
import Navbar from './components/Navbar.js';
import Community from './pages/Community.js';
import NewsFeed from './components/NewsFeed.js';


function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-full">
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;

