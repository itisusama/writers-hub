'use client';
import { useState } from 'react';
import { Client, Databases, Query } from 'appwrite';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');
    
      try {
        // Fetch user data by querying the database
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          [Query.equal('user_name', userName)] // Correct query syntax
        );
    
        if (response.total === 0) {
          setMessage('Invalid username or password');
          setLoading(false);
          return;
        }
    
        const user = response.documents[0];
    
        // Compare the hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.user_password);
        if (!isPasswordValid) {
          setMessage('Invalid username or password');
          setLoading(false);
          return;
        }
    
        // Save a session token (use cookies/localStorage)
        localStorage.setItem('userSession', JSON.stringify({ userName: user.user_name }));
    
        // Redirect to dashboard
        router.push('/dashboard');
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 text-black">
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message && <p className="text-center text-sm text-gray-700 mt-4">{message}</p>}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-medium text-red-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
