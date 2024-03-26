import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import React, { Suspense, lazy } from 'react';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Canvas = lazy(() => import('./pages/Canvas'));
const Community = lazy(() => import('./pages/Community.js'));
const Tutorial = lazy(() => import('./pages/Tutorial.js'));
const PlannerCreate = lazy(() => import('./pages/PlannerCreate.js'));
const Call = lazy(() => import('./pages/Call.js'));
const StickyNotes = lazy(() => import('./pages/StickyNotes.js'));
const Choice = lazy(() => import('./pages/Choice.js'));
const Groups = lazy(() => import('./pages/Groups.js'));
const DocxEditor = lazy(() => import('./pages/DocxEditor.js'));
const CreateProfile = lazy(() => import('./components/CreateProfile.js'));
const DisplayProfile = lazy(() => import('./components/DisplayProfile.js'));
const FriendsChat = lazy(() => import('./components/FriendsChat/FriendsChat.jsx'));

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
      <Router>
    <div className="App bg-primary w-screen h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Auth */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/CreateProfile" element={<CreateProfile />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={currentUser ? <Community /> : <Navigate to="/Login" replace />}
            />
            <Route
              path="/DocxEditor"
              element={currentUser ? <DocxEditor /> : <Navigate to="/Login" replace />}
            />
            <Route
              path="/DocxEditor"
              element={currentUser ? <DocxEditor /> : <Navigate to="/Login" replace />}
            />
            <Route
              path="/Canvas"
              element={currentUser ? <Canvas /> : <Navigate to="/Login" replace />}
            />
            <Route
              path="/Dashboard"
              element={currentUser ? <Home /> : <Navigate to="/Login" replace />}
            />
            <Route
              path="/Tutorial"
              element={currentUser ? <Tutorial /> : <Navigate to="/Login" replace />}
            />
            <Route
              path="/Notes"
              element={currentUser ? <StickyNotes /> : <Navigate to="/Login" replace />}
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
              path="/Groups"
              element={currentUser ? <Groups /> : <Navigate to="/Login" replace />}
            />

            <Route
              path="/DisplayProfile"
              element={currentUser ? <DisplayProfile /> : <Navigate to="/Login" replace />}
            />

            <Route
              path="/Choice"
              element={currentUser ? <Choice /> : <Navigate to="/Login" replace />}
            />

            <Route
              path="/Messaging"
              element={currentUser ? <FriendsChat /> : <Navigate to="/Login" replace />}
            />
          </Routes>
        </Suspense>
    </div>
      </Router>
  );
}


export default App;
