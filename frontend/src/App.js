// frontend/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TourEditor from './components/TourEditor';
import TourPreview from './components/TourPreview';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PublicTourPreview from './components/PublicTourPreview';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<TourEditor />} />
        <Route path="/edit/:id" element={<TourEditor />} />
        <Route path="/preview/:id" element={<TourPreview />} />
        <Route path="/public/:id" element={<PublicTourPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
