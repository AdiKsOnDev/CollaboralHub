import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Canvas from './pages/Canvas';
import Navbar from './components/Navbar.js';
import PlannerCreate from './pages/PlannerCreate.js';

function App() {
  const auth = getAuth(fireApp);

  if (auth.currentUser) {
    return (
      <Router>
        <div className="App bg-primary w-screen h-screen">
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Canvas" element={<Canvas />} />
            <Route path="/Planner" element={<PlannerCreate />} />
          </Routes>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="App bg-primary w-screen h-screen">
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
