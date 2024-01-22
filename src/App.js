import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./context/AuthContext.js";

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar.js';

function App() {
  const currentUser = useContext(AuthContext);

  console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />
    }

    return children;
  };
  
  return (
    <Router>
      <div className="App bg-primary w-screen h-screen">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Navbar /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;

