import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PublicTourPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tours/public/${id}`);
        setTour(res.data);
      } catch (err) {
        alert('Tour not found or private');
        navigate('/');
      }
    };

    fetchTour();
  }, [id, navigate]);

  if (!tour) return <p>Loading...</p>;
  const step = tour.steps[stepIndex];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🌍 Public Tour Preview</h2>

  <div className="relative border rounded-lg overflow-hidden shadow-md">
    <img
      src={tour.image}
      alt="Tour"
      className="w-full object-contain max-h-[500px] bg-gray-100"
    />

    <AnimatePresence mode="wait">
      {step && (
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 left-6 bg-white bg-opacity-95 p-4 rounded-md shadow-lg max-w-sm"
        >
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{step.title}</h3>
          <p className="text-gray-600 text-sm">{step.description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>

  {/* Navigation */}
  <div className="flex justify-between mt-6">
    <button
      disabled={stepIndex === 0}
      onClick={() => setStepIndex(stepIndex - 1)}
      className={`px-4 py-2 rounded-md text-white transition ${
        stepIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
      }`}
    >
      ⬅ Previous
    </button>

    <button
      onClick={() => navigate('/')}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
    >
      Exit
    </button>

    <button
      disabled={stepIndex === tour.steps.length - 1}
      onClick={() => setStepIndex(stepIndex + 1)}
      className={`px-4 py-2 rounded-md text-white transition ${
        stepIndex === tour.steps.length - 1
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      Next ➡
    </button>
  </div>
</div>

  );
};

export default PublicTourPreview;
