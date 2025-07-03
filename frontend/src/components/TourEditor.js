import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TourEditor = () => {
  const [image, setImage] = useState(null);
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState({ title: '', description: '' });
  const [isPublic, setIsPublic] = useState(false);


  const { id } = useParams(); // undefined if creating a new tour
const navigate = useNavigate();

useEffect(() => {
  if (id) {
    const fetchTour = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImage(res.data.image);
        setSteps(res.data.steps);
      } catch (err) {
        alert('Failed to load tour for editing');
      }
    };
    fetchTour();
  }
}, [id]);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result); // base64
    if (file) reader.readAsDataURL(file);
  };

  const addStep = () => {
    if (!newStep.title || !newStep.description) return;
    setSteps([...steps, { ...newStep, order: steps.length + 1 }]);
    setNewStep({ title: '', description: '' });
  };

  const handleSaveTour = async () => {
  try {
    const token = localStorage.getItem('token');
    const url = id
      ? `http://localhost:5000/api/tours/${id}`
      : 'http://localhost:5000/api/tours/create';

    const method = id ? 'put' : 'post';

    await axios[method](
  url,
  {
    image,
    steps,
    isPublic: isPublic, // ✅ Use state value here
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);


    alert(id ? 'Tour updated!' : 'Tour created!');
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    alert('Failed to save tour');
  }
};

  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
  <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🛠️ Create Product Tour</h2>

  {/* Image Upload */}
  <div className="mb-6">
    <label className="block font-medium mb-2">Upload Screenshot:</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
    {image && (
      <img
        src={image}
        alt="Preview"
        className="mt-4 max-h-64 w-full object-contain rounded-lg shadow border"
      />
    )}
  </div>

  {/* Add Step */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-3 text-gray-700">Add Step</h3>
    <input
      type="text"
      placeholder="Step Title"
      className="w-full mb-3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newStep.title}
      onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
    />
    <textarea
      placeholder="Step Description"
      className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={newStep.description}
      onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
      rows={4}
    />
    <button
      onClick={addStep}
      className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
    >
      ➕ Add Step
    </button>
  </div>

  {/* Steps Preview */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-gray-700 mb-3">📋 Tour Steps</h3>
    {steps.length === 0 ? (
      <p className="text-gray-500">No steps added yet.</p>
    ) : (
      steps.map((step, i) => (
        <div key={i} className="mb-3 p-4 border rounded shadow-sm bg-gray-50">
          <h4 className="font-bold text-gray-800">{step.order}. {step.title}</h4>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))
    )}
  </div>

  {/* Public Option + Save */}
  <div className="flex items-center justify-between mt-6">
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isPublic}
        onChange={(e) => setIsPublic(e.target.checked)}
        className="h-4 w-4"
      />
      <span className="text-gray-700">Make this tour public</span>
    </label>

    <button
      onClick={handleSaveTour}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
    >
      💾 Save Tour
    </button>
  </div>
</div>

  );
};

export default TourEditor;
