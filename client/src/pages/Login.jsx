import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/loginValidation";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validating inputs
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      if (!data || !data.token) {
        throw new Error("Invalid response from server");
      }
      login(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-300 p-6">
      <div className=" w-full max-w-xl max-h-xl bg-gray-100 rounded-xl shadow-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Welcome Back!</h1>
          <p className="text-gray-700 text-sm">
            Please enter your login details!
          </p>
        </div>
        <form
          noValidate
          className="flex flex-col space-y-4"
          onSubmit={handleLogin}
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            className="px-6 py-3 rounded bg-white shadow-sm  w-full placeholder:text-sm 
              focus:outline-none focus:ring-1 focus:ring-gray-800"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-6 py-3 rounded bg-white shadow-sm  w-full  placeholder:text-sm 
              focus:outline-none focus:ring-1 focus:ring-gray-800"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`cursor-pointer bg-gray-800 text-white py-2 rounded hover:bg-gray-800 transition duration-200 ${
              loading ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
