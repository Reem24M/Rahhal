import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Pages
import Login from "./auth/Login";
import SignUp from "./auth/SignUp.tsx";
import ForgetPassword from "./auth/ForgetPassword.tsx";
import ResetPassword from "./auth/ResetPassword.tsx";
import ChangePassword from "./auth/ChangePassword.tsx";
import VerifyEmail from "./auth/VerifyEmail.tsx";
// Profile Pages
import ProfilePage from "./profile/ProfilePage";

// Feed Pages
import HomeFeed from "./feed/HomeFeed";
import CreatePost from './feed/CreatePost';
import EditPost from './feed/EditPost.tsx';

// Trips Pages
import MyTrips from "./trips/MyTrips";

// Groups Pages
import GroupDetails from "./groups/GroupDetails";

// Chat Pages
import ChatPage from "./chat/ChatPage";

// Optional: 404 page
import NotFound from "./NotFound/notfound";
import MainLayout from "../layouts/mainLayout";
import AuthLayout from "../layouts/AuthLayout";

// setting
import SettingPage from "./settings/settingpage";
const Pages = () => {
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Route>

        <Route element={<MainLayout />}>
          {/* Protected Pages */}
          <Route
            path="/profile"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/feed"
            element={isAuthenticated ? <HomeFeed /> : <Navigate to="/login" />}
          />
          <Route
            path="/trips"
            element={isAuthenticated ? <MyTrips /> : <Navigate to="/login" />}
          />
          <Route
            path="/groups/:groupId"
            element={
              isAuthenticated ? <GroupDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? <SettingPage /> : <Navigate to="/login" />
            }
          />

          {/* Home / Default */}
          <Route path="/" element={<Navigate to="/feed" />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Pages;
