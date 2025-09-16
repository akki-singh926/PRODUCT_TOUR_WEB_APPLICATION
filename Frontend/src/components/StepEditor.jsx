// src/components/StepEditor.jsx
import { useState, useEffect } from "react";

const StepEditor = ({ step, onUpdate, onDelete }) => {
  const [localStep, setLocalStep] = useState(step);

  // Keep local state in sync if parent updates
  useEffect(() => {
    setLocalStep(step);
  }, [step]);

  const handleChange = (e) => {
    const updated = { ...localStep, [e.target.name]: e.target.value };
    setLocalStep(updated);
    onUpdate(updated); // push update to parent
  };

  return (
    <div className="bg-white shadow p-4 mb-4 rounded">
      <input
        type="text"
        name="imageUrl"
        value={localStep.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        name="annotation"
        value={localStep.annotation}
        onChange={handleChange}
        placeholder="Annotation"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={() => onDelete(step.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Step
      </button>
    </div>
  );
};

export default StepEditor;
