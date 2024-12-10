'use client';

import { useState } from 'react';
import { Client, Databases } from 'appwrite';
import bcrypt from 'bcryptjs';

const Page = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Initialize Appwrite client
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert the data into the Appwrite database
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
        'unique()', // Auto-generate a unique ID
        { user_name: userName, user_password: hashedPassword }
      );

      setMessage('Registration successful!');
      setUserName('');
      setPassword('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4 text-black">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full px-4 py-2 mt-1 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-red-600 rounded ${
              loading ? 'opacity-50' : 'hover:bg-red-700'
            } focus:ring-2 focus:ring-red-500 focus:outline-none`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className="text-center text-sm text-gray-700 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Page;
