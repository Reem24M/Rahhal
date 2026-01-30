import { Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-cyan-50 px-4">
       {/* Logo */}
       <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold tracking-wide text-[#28AEBD]">
          RAHHAL
        </h1>
      </div>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>

       

        <Outlet />
        
      </div>
     

    </div>
    
  );
}
