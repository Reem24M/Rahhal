import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-1">Log in to continue your journey.</p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Email */}
        <input type="email" placeholder="Email Address" className="input w-full border rounded px-3 py-2" />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input pr-10 w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-[#28AEBD] hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#28AEBD] hover:bg-[#1F96A3] text-white font-medium py-3 rounded-full transition"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR LOG IN WITH</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="w-full border border-gray-200 py-3 rounded-full flex items-center justify-center gap-3 hover:bg-gray-50 transition duration-200"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="text-[#28AEBD] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

