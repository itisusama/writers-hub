"use client"
import { useState, useEffect } from "react";
import { db } from "../config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Test = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [users, setUsers] = useState([]);
    const [userViewPopup, setUserViewPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setUserViewPopup(true);
    }
    // insert
    const insertData = async(name, age) => {
        try {
            const docRef = await addDoc(collection(db, "users"), { name, age });
            return docRef.id;
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        }
    
    // fetch
    const fetchData = async () => {
        try {
        //   from which collection
          const querySnapshot = await getDocs(collection(db, "users"));
          const fetchedUsers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(fetchedUsers);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name && age) {
            await insertData(name, parseInt(age));
            setName("");
            setAge("");
            alert("Data added successfully!");
          } else {
            alert("Please fill in all fields.");
          }
    }

    // Optional: Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
    Insert Data into Firebase
  </h1>
  <form onSubmit={handleSubmit} class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Age:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <button
      type="submit"
      class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Submit
    </button>
  </form>

  {userViewPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">User Details</h3>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <button
              onClick={() => setUserViewPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

  <h2 class="text-xl font-semibold text-gray-800 mt-8">Users</h2>
  <ul class="mt-4 space-y-2">
    {users.map((user) => (
      <li
        key={user.id}
        class="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
      >
        <span class="text-gray-700 font-medium">
          {user.name} - {user.age} years old
        </span>
        <span className="cursor-pointer" onClick={() => handleViewClick(user)}>view</span>
      </li>
    ))}
  </ul>
</div>

  )
}

export default Test