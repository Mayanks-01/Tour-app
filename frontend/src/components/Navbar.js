// components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">
        🗺️ TourBuilder
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {token && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
        {token && <Link to="/editor" className="hover:underline">Create Tour</Link>}
        {!token && <Link to="/login" className="hover:underline">Login</Link>}
        {!token && <Link to="/signup" className="hover:underline">Signup</Link>}
        {token && (
          <button onClick={handleLogout} className="hover:underline text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
