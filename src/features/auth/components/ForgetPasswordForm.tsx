import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter your email address to reset your password.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="input"
          required
        />

        {/* Submit */}
        {/* <button
          type="submit"
          className="w-full bg-[#28AEBD] hover:bg-[#1F96A3] text-white font-medium py-3 rounded-full transition"
        >
          Send Reset Link
        </button> */}
        <button
          type="button"
          onClick={() => navigate("/verify-email")}
          className="w-full bg-[#28AEBD] hover:bg-[#1F96A3] text-white font-medium py-3 rounded-full transition"
        >
          Send Reset Link
        </button>


        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
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
        Remembered your password?{" "}
        <Link to="/login" className="text-[#28AEBD] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
