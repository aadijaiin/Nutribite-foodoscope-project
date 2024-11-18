// pages/auth/SignInSignUpPage.js
'use client'
import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

export default function SignInSignUpPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Determine the correct endpoint and payload based on the form type
    const endpoint = isSignUp ? '/api/auth/sign-up' : '/api/auth/sign-in';
    const payload = isSignUp 
      ? { name: username, email, password } 
      : { email: email || username, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(isSignUp ? 'Account created successfully!' : 'Sign-in successful!');
        // Optionally, redirect user after successful sign-up or sign-in
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-200 via-orange-100 to-red-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex items-center border rounded-lg px-3 py-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  className="w-full focus:outline-none text-gray-700"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isSignUp ? 'Email Address' : 'Username or Email'}
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2">
              {isSignUp ? (
                <FaEnvelope className="text-gray-400 mr-2" />
              ) : (
                <FaUser className="text-gray-400 mr-2" />
              )}
              <input
                type="text"
                className="w-full focus:outline-none text-gray-700"
                placeholder={isSignUp ? 'Enter your email' : 'Enter your username or email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full focus:outline-none text-gray-700"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p className="text-center text-sm text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-red-500 font-semibold hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
          {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}
