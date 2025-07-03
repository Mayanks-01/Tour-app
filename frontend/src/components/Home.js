// components/Home.js
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
   <div className="max-w-2xl mx-auto p-10 text-center bg-white mt-10 shadow-md rounded-lg">
  <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to TourBuilder</h1>
  <p className="text-lg mb-6 text-gray-700">Create, organize and share interactive step-by-step image tours.</p>
  <div className="space-x-4">
    {token ? (
      <>
        <Link to="/editor" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow">
          + Create Tour
        </Link>
        <Link to="/dashboard" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow">
          📂 Dashboard
        </Link>
      </>
    ) : (
      <>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow">
          🔐 Login
        </Link>
        <Link to="/signup" className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md shadow">
          📝 Signup
        </Link>
      </>
    )}
  </div>
</div>

  );
};

export default Home;
