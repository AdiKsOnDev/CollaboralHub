import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Canvas from './pages/Canvas';
import Community from './pages/Community.js';

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
          <Route
            path="/"
            element={currentUser ? <Home /> : <Navigate to="/Login" replace />}
          />
          <Route
            path="/Canvas"
            element={currentUser ? <Canvas /> : <Navigate to="/Login" replace />}
          />
          <Route
            path="/Community"
            element={currentUser ? <Community /> : <Navigate to="/Login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
