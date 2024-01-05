import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Canvas from './pages/Canvas';

function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Canvas" element={<Canvas />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;
