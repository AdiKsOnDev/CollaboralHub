import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Canvas from './pages/Canvas';
import Navbar from './components/Navbar.js';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App bg-primary w-screen h-screen">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* Protected Routes */}
          {currentUser ? (
            <>
              <Route path="/" element={<Navbar />} />
              <Route path="/Canvas" element={<Canvas />} />
            </>
          ) : (
            <Navigate to="/Login" replace />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
