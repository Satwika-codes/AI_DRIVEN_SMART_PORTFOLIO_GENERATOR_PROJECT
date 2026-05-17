import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 backdrop-blur-md bg-white/10 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide hover:scale-110 transition duration-300 cursor-pointer">
          AI Smart Portfolio 
        </h1>

        <div className="space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-xl 
            hover:scale-110 hover:shadow-lg transition duration-300">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="px-6 py-2 bg-purple-900 rounded-xl 
            hover:bg-purple-800 hover:scale-110 hover:shadow-2xl transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">

        <h2 className="text-6xl font-extrabold mb-6 drop-shadow-xl hover:scale-105 transition duration-500">
          Create Your AI Portfolio 
        </h2>

        <p className="text-xl max-w-2xl mb-10 text-purple-100">
          Bright. Bold. Beautiful.  
          Generate stunning portfolios instantly with AI power.
        </p>

        <Link to="/register">
          <button className="px-10 py-4 text-lg font-semibold rounded-2xl 
          bg-white text-purple-700
          hover:scale-110 hover:shadow-2xl hover:shadow-purple-700/40
          transition duration-300 ease-in-out">
            Create My Portfolio 🚀
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Landing;