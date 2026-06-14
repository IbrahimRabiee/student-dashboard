import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthInput = ({ label, icon: Icon, error, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label className="text-sm font-medium text-neutral-700">{label}</label>

      <div
        className={`mt-2 flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-within:ring-[1.5px] ${
          error
            ? "border-danger-500 focus-within:ring-danger-400"
            : "border-neutral-300 focus-within:ring-primary-600"
        }`}
      >
        {Icon && <Icon size={20} className="text-neutral-400" />}

        <input
          {...props}
          className="w-full bg-transparent text-neutral-800 outline-none placeholder:text-neutral-400"
          type={inputType}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-danger-500">{error}</p>}
    </div>
  );
};

export default AuthInput;
