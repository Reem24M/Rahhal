import type { ProfileStats as StatsType } from "../types/profile.types";

const stats: StatsType = {
  trips: 12,
  countries: 8,
  following: 400,
  followers: 120,
};

const ProfileStats: React.FC = () => {
  return (
    <div className="mt-6 flex justify-between text-center">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key}>
          <p className="text-lg font-semibold">{value}</p>
          <p className="text-xs text-gray-500 capitalize">{key}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
