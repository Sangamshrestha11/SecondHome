import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [state, setState] = useState("Log In");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password || (state === "Sign Up" && !fullName)) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (state === "Sign Up") {
      const res = await axios.post("http://localhost:8000/api/auth/signup", {
        fullName,
        email,
        password,
      });

      console.log("Signup response:", res.data);
      alert(res.data.message || "Signup successful");
      setState("Log In");

    } else {

      const response = await axios.post("http://localhost:8000/auth", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login success");
        navigate("/home");
      }
    }

  } catch (error) {

    console.error("Full error:", error);

    if (error.response) {
      alert(error.response.data.message || "Server error");
    } else if (error.request) {
      alert("Cannot connect to server");
    } else {
      alert("Something went wrong");
    }
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg-[rgb(15,23,42)] shadow-md font-sans px-4">
      <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-8 w-full max-w-sm">

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4 text-5xl animate-bounce text-blue-600">
            <span>👤</span>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 tracking-wider">
            {state === "Sign Up" ? "Second Home" : "Second Home"}
          </h2>

          {/* Full Name (Signup only) */}
          {state === "Sign Up" && (
            <>
              <label className="block text-gray-600 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </>
          )}

          {/* Email */}
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />

          {/* Password */}
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
          >
            {state === "Sign Up" ? "Signup" : "Login"}
          </button>
        </form>

        {/* Forgot password only for login */}
        {state !== "Sign Up" && (
          <p
            className="text-sm text-center mt-3 cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </p>
        )}

        {/* Toggle */}
        <p className="text-sm text-center mt-4">
          {state === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            onClick={() =>
              setState(state === "Sign Up" ? "Log In" : "Sign Up")
            }
            className="text-blue-700 hover:underline font-medium"
          >
            {state === "Sign Up" ? "Login" : "Signup"}
          </button>
        </p>

      </div>
    </div>
  );
}