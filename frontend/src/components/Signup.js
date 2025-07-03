// frontend/src/components/Signup.js
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });
      alert('User created! Go to login.');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
    <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create Your Account</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow"
      >
        Sign Up
      </button>
    </form>

    <p className="text-sm text-center text-gray-500 mt-4">
      Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
    </p>
  </div>
</div>

  );
};

export default Signup;
