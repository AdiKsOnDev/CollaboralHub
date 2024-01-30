import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { fireApp } from './firebase.js';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Canvas from './pages/Canvas';
import Navbar from './components/Navbar.js';
import DocxEditor from './pages/DocxEditor.js';

function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-screen">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/Docx" element={<DocxEditor />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;

