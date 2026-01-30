import { Link, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Enter verification code
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter the 6-digit code sent to your email.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-xl focus:outline-none focus:border-[#28AEBD]"
          />
        ))}
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={() => navigate("/reset-password")}
        className="w-full bg-[#28AEBD] hover:bg-[#1F96A3] text-white font-medium py-3 rounded-full transition"
      >
        Verify
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Didn’t get the code?{" "}
        <button className="text-[#28AEBD] hover:underline font-medium">
          Resend
        </button>
      </p>

      <p className="text-center text-sm text-gray-500 mt-2">
        Back to{" "}
        <Link to="/login" className="text-[#28AEBD] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
