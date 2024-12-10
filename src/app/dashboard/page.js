'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [username, setUsername] = useState();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (!session) {
      router.push('/');
    } else {
      setUsername(session.userName);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <header className="w-full bg-red-600 text-white p-4 shadow-md">
        <h1 className="text-lg font-semibold">Welcome {username}</h1>
        {/* Logout Button */}
  <button
    onClick={() => {
      localStorage.removeItem('userSession'); // Remove session
      router.push('/'); // Redirect to home
    }}
    className="w-full text-left p-2 mb-4 bg-red-600 text-white rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
  >
    Logout
  </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shadow-md p-4 hidden md:block">
          <nav className="space-y-4">
            <a
              href="#"
              className="block p-2 rounded hover:bg-red-100 text-red-600 font-medium"
            >
              Placeholder 1
            </a>
            <a
              href="#"
              className="block p-2 rounded hover:bg-red-100 text-red-600 font-medium"
            >
              Placeholder 2
            </a>
            <a
              href="#"
              className="block p-2 rounded hover:bg-red-100 text-red-600 font-medium"
            >
              Placeholder 3
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-4">
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Text Editor</h2>
            <textarea
              className="w-full h-[70vh] border text-black rounded p-4 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Start typing your text here..."
            ></textarea>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
