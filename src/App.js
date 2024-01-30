import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { fireApp } from './firebase.js';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StickyNotes from './pages/StickyNotes.js';
import Tutorial from './pages/Tutorial.js';

import Call from './pages/Call.js';


function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-screen">
        <Routes>
          <Route path="/" element={<StickyNotes />} />
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
          <Route
            path="/Tutorial"
            element={currentUser ? <Tutorial /> : <Navigate to="/Login" replace />}
          />
          <Route
            path="/Planner"
            element={currentUser ? <PlannerCreate /> : <Navigate to="/Login" replace />}
          />
          <Route
            path="/Call"
            element={currentUser ? <Call /> : <Navigate to="/Login" replace />}
          />
          <Route 
            path="/Notes" 
            element={currentUser ? <StickyNotes /> : <Navigate to="/Login" replace />}
          />
        </Routes>
      </div>
    </Router>

  );
}


export default App;
