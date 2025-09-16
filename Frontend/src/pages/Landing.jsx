// src/pages/Landing.jsx
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">🚀 ProductTours</h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col md:flex-row items-center justify-center px-8">
        {/* Text */}
        <div className="text-center md:text-left max-w-lg">
          <h2 className="text-5xl font-extrabold leading-tight">
            Create Interactive <span className="text-yellow-300">Product Tours</span>
          </h2>
          <p className="mt-4 text-lg text-gray-100">
            Engage your users with step-by-step guided demos. 
            Easy to create, beautiful to share.
          </p>
          <div className="mt-6 space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-yellow-300 text-indigo-900 font-bold rounded-lg hover:bg-yellow-400"
            >
              Start Free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="mt-10 md:mt-0 md:ml-12">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Product Tour"
            className="w-full max-w-md"
          />
        </div>
      </main>
    </div>
  );
};

export default Landing;
