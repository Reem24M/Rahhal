type PostUserProps = {
  name?: string;
  username?: string;
  avatar?: string;
};
const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

export default function PostUser({
  name,
  username,
  avatar,
}: PostUserProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={avatar || DEFAULT_AVATAR}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <p className="font-medium text-sm text-[var(--color-gray-900)]">
          {name}
        </p>
        <p className="text-xs text-[var(--color-gray-400)]">
          Posting as @{username}
        </p>
      </div>
    </div>
  );
}


