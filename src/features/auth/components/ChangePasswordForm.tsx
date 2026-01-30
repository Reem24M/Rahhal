import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMatch = password === confirmPassword && confirmPassword !== "";

  const isValid = isMinLength && hasSpecialChar && isMatch;

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">change Password</h2>
        <p className="text-sm text-gray-500 mt-1">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Old Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
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

        {/* New Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
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

        {/* Rules */}
        <div className="text-sm space-y-1">
          <p className={isMinLength ? "text-[#28AEBD]" : "text-gray-400"}>
            ✓ Must be at least 8 characters
          </p>
          <p className={hasSpecialChar ? "text-[#28AEBD]" : "text-gray-400"}>
            ✓ Must contain one special character
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full font-medium py-3 rounded-full transition
            ${isValid
              ? "bg-[#28AEBD] hover:bg-[#1F96A3] text-white"
              : "bg-gray-300 text-white cursor-not-allowed"
            }`}
        >
          Change Password
        </button>
      </form>
    </div>
  );
}