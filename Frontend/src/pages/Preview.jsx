// src/pages/Preview.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

const Preview = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  // Fetch tour
  const fetchTour = async () => {
    try {
      const res = await api.get(`/tours/${id}`);
      const data = res.data || {};

      // ✅ Normalize steps to ensure array & unique ids
      const steps = (Array.isArray(data.steps) ? data.steps : []).map((s) =>
        s.id ? s : { ...s, id: Date.now().toString() + Math.random().toString(36).slice(2) }
      );

      setTour({ ...data, steps });
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTour();
  }, [id]);

  // Navigation
  const nextStep = () => {
    if (stepIndex < tour.steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (loading) return <p className="p-6">Loading tour...</p>;
  if (!tour) return <p className="p-6">Tour not found</p>;
  if (!tour.steps || tour.steps.length === 0) return <p className="p-6">No steps in this tour</p>;

  const step = tour.steps[stepIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
        <p className="text-gray-600 mb-6">{tour.description}</p>

        <div className="relative bg-white shadow rounded p-4 h-96 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex flex-col items-center justify-center"
            >
              {step.imageUrl ? (
                <img
                  src={step.imageUrl}
                  alt="Step"
                  className="max-h-64 mb-4 rounded object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x250?text=Image+Not+Found";
                  }}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded mb-4">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              <p className="text-lg font-medium text-center">{step.annotation}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className={`px-4 py-2 rounded ${
              stepIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={stepIndex === tour.steps.length - 1}
            className={`px-4 py-2 rounded ${
              stepIndex === tour.steps.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
