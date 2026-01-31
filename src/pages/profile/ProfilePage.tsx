import ProfileHeader from "../../features/profile/components/ProfileHeader";
import ProfileStats from "../../features/profile/components/ProfileStats";
import ProfileTabs from "../../features/profile/components/ProfileTabs";
import ProfilePosts from "../../features/profile/components/ProfilePosts";

const ProfilePage: React.FC = () => {
  return (
   <div className="mx-auto w-full min-h-screen bg-white px-4 py-4">
      <ProfileHeader />
      <ProfileStats />
      <ProfileTabs />
      <ProfilePosts />
    </div>
  );
};

export default ProfilePage;
