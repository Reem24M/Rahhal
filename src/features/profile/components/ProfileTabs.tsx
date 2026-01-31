import { useState } from "react";
import type{ ProfileTab } from "../types/profile.types";

const tabs: ProfileTab[] = ["Posts", "My trips", "Saved"];

const ProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");

  return (
    <div className="mt-6 flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 pb-2 text-sm font-medium ${
            activeTab === tab
              ? "border-b-2 border-black text-black"
              : "text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
