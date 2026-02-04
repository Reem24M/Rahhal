import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center px-4">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
