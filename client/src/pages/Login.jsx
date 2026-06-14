import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/loginValidation";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/authContext";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validating inputs
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      if (!data || !data.token) {
        throw new Error("Invalid response from server");
      }
      login(data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: error.message || "An error occurred. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        title="Welcome back 👋"
        subtitle="Sign in to continue to your dashboard"
      >
        <form noValidate onSubmit={handleLogin} className="space-y-5">
          <AuthInput
            label="Email"
            icon={Mail}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            icon={Lock}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-neutral-600">
              <input type="checkbox" className="accent-primary-700" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-primary-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {errors.server && (
            <p className="text-danger-500 text-sm text-center">
              {errors.server}
            </p>
          )}

          <AuthButton loading={loading} loadingText="Logging in...">
            Sign in
          </AuthButton>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-200" />
            <span className="text-sm text-neutral-400">or continue with</span>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          <button
            type="button"
            className="w-full rounded-xl border border-neutral-300 py-3 font-semibold text-neutral-700 hover:bg-neutral-50 transition"
          >
            <FaGoogle className="inline mr-2" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-neutral-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary-700 hover:text-primary-800 cursor-pointer"
            >
              Create an account
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
