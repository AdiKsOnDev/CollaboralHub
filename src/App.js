import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App bg-primary w-screen h-full">
        <Routes>
          <Route path="/" element={<h1 className='text-white'>Home</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
