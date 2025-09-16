// src/pages/Editor.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import StepEditor from "../components/StepEditor";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tour data
  const fetchTour = async () => {
    try {
      const res = await api.get(`/tours/${id}`);
      const data = res.data || {};

      // ✅ ensure steps is an array with ids
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

  // Handle title/description/public checkbox changes
  const handleChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  // Add new step
  const addStep = () => {
    const newStep = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      imageUrl: "",
      annotation: "",
    };
    const updatedSteps = [...(tour.steps || []), newStep];
    console.log("Added step ->", newStep, "Updated steps:", updatedSteps);
    setTour({ ...tour, steps: updatedSteps });
  };

  // Update a step by id
  const updateStep = (updatedStep) => {
    const updatedSteps = tour.steps.map((s) =>
      s.id === updatedStep.id ? updatedStep : s
    );
    setTour({ ...tour, steps: updatedSteps });
  };

  // Delete a step by id
  const deleteStep = (stepId) => {
    const updatedSteps = tour.steps.filter((s) => s.id !== stepId);
    setTour({ ...tour, steps: updatedSteps });
  };

  // Save tour
  const handleSave = async () => {
    try {
      await api.put(`/tours/${id}`, tour);
      alert("Tour saved!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save tour");
    }
  };

  if (loading) return <p className="p-6">Loading tour...</p>;
  if (!tour) return <p className="p-6">Tour not found</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Edit Tour</h1>

        <input
          type="text"
          name="title"
          value={tour.title}
          onChange={handleChange}
          placeholder="Tour Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={tour.description}
          onChange={handleChange}
          placeholder="Tour Description"
          className="w-full p-2 border rounded"
        />

        <div className="flex items-center space-x-2">
          <label className="font-medium">Public:</label>
          <input
            type="checkbox"
            checked={tour.isPublic}
            onChange={(e) => setTour({ ...tour, isPublic: e.target.checked })}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Steps</h2>
          {tour.steps.map((step) => (
            <StepEditor
              key={step.id}
              step={step}
              onUpdate={updateStep}
              onDelete={deleteStep}
            />
          ))}
          <button
            onClick={addStep}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            + Add Step
          </button>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Tour
        </button>
      </div>
    </div>
  );
};

export default Editor;
