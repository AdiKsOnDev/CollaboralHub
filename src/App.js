import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { fireApp } from './firebase.js';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  const auth = getAuth(fireApp);

  if (auth.currentUser) {
    return (
      <Router>
        <div className="App bg-primary w-screen h-screen">
          <Routes>
            <Route path="/" element={<Navbar />} />
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

