import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/NavBar';
import Community from './pages/Community.js';
import NewsFeed from './components/NewsFeed.js';


function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-full overflow-hidden">
        <Navbar />
        <Community />
        <NewsFeed />
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
