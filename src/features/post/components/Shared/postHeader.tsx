type Props = {
  onPost: () => void;
  isPosting: boolean;
  title?: string;       
  mode?: "create" | "edit";
};

export default function PostHeader({ onPost, isPosting, title, mode = "create" }: Props) {
  return (
    <div className="relative flex items-center mb-5">
      <h1 className="text-center text-2xl font-semibold text-gray-800">
        {title || (mode === "edit" ? "Edit Post" : "Create Post")}
      </h1>

      <button
        onClick={onPost}
        disabled={isPosting}
        className={`ml-auto px-4 py-1.5 rounded-full text-sm text-white transition 
          ${isPosting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)]"
          }`}
      >
        {isPosting
          ? mode === "edit"
            ? "Saving..."
            : "Posting..."
          : mode === "edit"
            ? "Save"
            : "Post"
        }
      </button>
    </div>
  );
}





