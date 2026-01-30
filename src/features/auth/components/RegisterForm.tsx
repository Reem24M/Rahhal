import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
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
          <input type="text" placeholder="First Name" className="input" />
          <input type="text" placeholder="Last Name" className="input" />
        </div>

        {/* Username */}
        <div>
          <input type="text" placeholder="Username" className="input" />
          <p className="text-xs text-gray-400 mt-1">
          </p>
        </div>

        {/* Email */}
        <input type="email" placeholder="Email Address" className="input" />

        {/* Password */}
        <input type="password" placeholder="Password" className="input" />

        {/* Confirm Password */}
        <input type="password" placeholder="Confirm Password" className="input" />

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
