import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/registerValidation";
import { registerUser } from "../services/authServices";
import { useAuth } from "../context/authContext";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validating inputs
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await registerUser(firstName, lastName, email, password);
      if (!data) {
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
        title="Create your account ✨"
        subtitle="Start organizing your academic life"
      >
        <form noValidate onSubmit={handleRegister} className="space-y-5">
          <div className="flex gap-3">
            <AuthInput
              label="First Name"
              icon={User}
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={errors.name}
            />

            <AuthInput
              label="Last Name"
              icon={User}
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.name}
            />
          </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <AuthInput
            label="Confirm password"
            icon={Lock}
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          {errors.server && (
            <p className="text-danger-500 text-sm text-center">
              {errors.server}
            </p>
          )}

          <AuthButton loading={loading} loadingText="Creating account...">
            Create account
          </AuthButton>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-700 hover:text-primary-800 cursor-pointer"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Register;
