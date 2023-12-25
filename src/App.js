import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginBox from './components/LoginBox';

function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-full">
        <Routes>
          <Route path="/" element={<LoginBox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
