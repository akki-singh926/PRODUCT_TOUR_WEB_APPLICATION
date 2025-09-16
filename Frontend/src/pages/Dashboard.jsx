// src/pages/Dashboard.jsx
import Navbar from "../components/Navbar.jsx";
import TourCard from "../components/TourCard.jsx";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
;

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch user tours
  const fetchTours = async () => {
    try {
      const res = await api.get("/tours");
      setTours(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Create a new tour
  const handleCreateTour = async () => {
    try {
      const res = await api.post("/tours", {
        title: "Untitled Tour",
        description: "Start editing your tour...",
        steps: [],
        isPublic: false,
      });
      navigate(`/editor/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create tour");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Tours</h1>
          <button
            onClick={handleCreateTour}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Create New Tour
          </button>
        </div>

        {loading ? (
          <p>Loading tours...</p>
        ) : tours.length === 0 ? (
          <p>No tours yet. Click “Create New Tour” to start.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
