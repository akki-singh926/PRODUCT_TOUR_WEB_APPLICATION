// src/components/TourCard.jsx
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">
          {tour.title}
        </h2>
        <p className="text-gray-600 text-sm">{tour.description}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/preview/${tour._id}`}
          className="text-indigo-600 font-medium hover:underline"
        >
          Preview
        </Link>
        <Link
          to={`/editor/${tour._id}`}
          className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
