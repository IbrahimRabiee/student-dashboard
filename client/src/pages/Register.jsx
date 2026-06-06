import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/registerValidation";
import { registerUser } from "../services/authServices";
import { useAuth } from "../context/authContext";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validating inputs
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await registerUser(firstName, lastName, email, password);
      if (!data) {
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
          <h1 className="text-2xl font-semibold mb-2">
            Welcome To Our Website!
          </h1>
          <p className="text-gray-700 text-sm">Please fill in your Details!</p>
        </div>
        <form
          noValidate
          className="flex flex-col space-y-4"
          onSubmit={handleRegister}
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2">
            <input
              className="px-6 py-3 rounded bg-white shadow-sm  w-full placeholder:text-sm 
              focus:outline-none focus:ring-1 focus:ring-gray-800"
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="px-6 py-3 rounded bg-white shadow-sm  w-full placeholder:text-sm 
              focus:outline-none focus:ring-1 focus:ring-gray-800"
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <input
            className="px-6 py-3 rounded bg-white shadow-sm  w-full  placeholder:text-sm 
              focus:outline-none focus:ring-1 focus:ring-gray-800"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className={`cursor-pointer bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200 ${
              loading ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
