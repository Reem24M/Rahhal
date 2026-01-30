import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Join the Rahhal Community
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Plan trips, meet travelers, and explore the world.
        </p>
      </div>

      <form className="space-y-4">
        {/* First & Last name */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="First Name" className="input w-full border rounded px-3 py-2" />
          <input type="text" placeholder="Last Name" className="input w-full border rounded px-3 py-2" />
        </div>

        {/* Username */}
        <div>
          <input type="text" placeholder="Username" className="input w-full border rounded px-3 py-2" />
        </div>

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

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input pr-10 w-full border rounded px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#28AEBD] hover:bg-[#1F96A3] text-white font-medium py-3 rounded-full transition"
        >
          Start Exploring
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR SIGN UP WITH</span>
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
        Already have an account?{" "}
        <Link to="/login" className="text-[#28AEBD] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

