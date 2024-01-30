import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { fireApp } from './firebase.js';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StickyNotes from './pages/StickyNotes.js';


function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-screen">
        <Routes>
          <Route path="/" element={<StickyNotes />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;
