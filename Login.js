import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {

        alert("Login successful ✅");

        // ✅ STORE USER INFO
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);

        console.log(data);

        // redirect to dashboard
        navigate("/dashboard");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500">

      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-96 hover:scale-105 transition duration-500">

        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back 
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

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

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-900 text-white font-semibold 
            hover:bg-purple-800 hover:scale-105 hover:shadow-xl transition duration-300"
          >
            Login 🔐
          </button>

        </form>

        <p className="text-center text-white mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-bold underline hover:text-purple-200"
          >
            Register
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Login;