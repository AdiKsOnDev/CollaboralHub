import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Canvas from './pages/Canvas';
import Navbar from './components/Navbar.js';
import PlannerCreate from './pages/PlannerCreate.js';
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
          <Route
            path="/"
            element={currentUser ? <Navbar /> : <Navigate to="/Login" replace />}
          />
          <Route
            path="/Canvas"
            element={currentUser ? <Canvas /> : <Navigate to="/Login" replace />}
          />
          <Route
            path="/Planner"
            element={currentUser ? <PlannerCreate /> : <Navigate to="/Login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
