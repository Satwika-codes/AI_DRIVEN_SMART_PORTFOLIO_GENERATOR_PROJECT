import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.message}`);
        setLoading(false);
        return;
      }

      alert(data.message);
      setLoading(false);
      navigate("/login"); // redirect to login after successful registration
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-96 hover:scale-105 transition duration-500">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create Account 
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-900 text-white font-semibold 
            hover:bg-purple-800 hover:scale-105 hover:shadow-xl transition duration-300"
          >
            {loading ? "Registering..." : "Register 🚀"}
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline hover:text-purple-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;