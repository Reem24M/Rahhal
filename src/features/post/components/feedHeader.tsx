import { useNavigate } from "react-router-dom";

export default function FeedHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6 px-4 sm:px-8 ">
    
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rahhal Feed</h1>
        <p className="text-sm text-gray-500">
          Share your adventures with the community
        </p>
      </div>

      <button
        onClick={() => navigate("/create-post")}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create post
      </button>
    </div>
  );
}

