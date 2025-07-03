import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/api/tours/my-tours`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTours(res.data);
      } catch (err) {
        console.error('Error fetching tours:', err);
      }
    };

    fetchTours();
  }, []);

  const handleDeleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (err) {
      alert('Failed to delete tour');
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">📂 My Tours</h2>

      {tours.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No tours found. Start by creating your first one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg border transition duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={tour.image}
                alt="Tour"
                className="h-48 w-full object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    Steps: {tour.steps.length}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Created on: {new Date(tour.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-x-2 mt-auto flex flex-wrap">
                  <button
                    onClick={() => navigate(`/preview/${tour._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${tour._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>

                {tour.isPublic && (
                  <a
                    href={`${FRONTEND_URL}/public/${tour._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-blue-600 text-sm underline hover:text-blue-800 transition"
                  >
                    🔗 View Public Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
