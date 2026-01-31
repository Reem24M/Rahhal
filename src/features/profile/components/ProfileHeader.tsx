import Button from "../../../shared/components/Button";
import type { Profile } from "../types/profile.types";
import Image from "../../../../public/avater.png";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const profile: Profile = {
  name: "Mohamed Abdelnaser",
  location: "📍 San Francisco, CA",
  bio: "✈️ Travel enthusiast | 🌍 8 countries & counting | 📸 Capturing moments",
  avatar: Image,
};

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Left side: Avatar + Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <img
          src={profile.avatar}
          alt={profile.name}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />

        <div>
          <h2 className="text-base font-bold">{profile.name}</h2>
          <p className="text-xs text-gray-500">{profile.location}</p>
          <p className="mt-1 text-sm text-gray-700 leading-tight">
            {profile.bio}
          </p>

          {/* Buttons — Mobile only */}
          <div className="mt-3 flex gap-2 md:hidden">
            <Button>Edit</Button>
            <Button variant="outline">Share</Button>
            <Link to='/settings'>
              <Button variant="outline">
                <IoSettingsOutline className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Buttons — Desktop only */}
      <div className="hidden md:flex gap-2">
        <Button>Edit</Button>
        <Button variant="outline">Share</Button>
        <Button variant="outline">
          <IoSettingsOutline className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
