import type { Post } from "../../../types/post";
import { PostContent } from "./PostContent";

import { MessageCircle, Share2, MoreHorizontal, Edit, Trash2, Flag } from "lucide-react";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkOutline, HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

import { useState, useRef, useEffect } from "react";
import { deletePost, normalizeMediaUrl, savePost } from "./services/posts.api";
import { getUserId } from "../../../utils/auth";
import { CommentsModal } from "../components/CommentsModal";
import { useNavigate } from "react-router-dom";

export function PostHeader({
  userName,
  profileUrl,
  profileId,
  currentUserId,
  createdAt,
  onEdit,
  onDelete,
  onReport,
}: {
  userName: string;
  profileUrl: string;
  profileId: string;
  currentUserId: string;
  createdAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOwner = currentUserId === profileId;

  function formatTime(date?: string) {
    if (!date) return "";

    const now = new Date();
    const created = new Date(date);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

    return created.toLocaleDateString();
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 relative">
      <div className="flex items-center gap-3">
        <img src={profileUrl} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold">{userName}</span>
          {createdAt && (
            <span className="text-xs text-gray-500">{formatTime(createdAt)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isOwner && (
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${
              isFollowing
                ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                : "bg-white border border-black text-black hover:bg-gray-100"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50 overflow-hidden translate-x-3">
              {isOwner ? (
                <>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    onClick={onEdit}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition-colors"
                    onClick={onDelete}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition-colors"
                  onClick={onReport}
                >
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PostMedia({ media }: { media: string[] }) {
  const [current, setCurrent] = useState(0);
  if (!media.length) return null;

  const next = () => setCurrent((prev) => (prev + 1) % media.length);
  const prev = () => setCurrent((prev) => (prev - 1 + media.length) % media.length);

  return (
    <div className="relative w-full bg-black/5">
      <img
        src={normalizeMediaUrl(media[current])}
        className="w-full max-h-[500px] object-cover"
      />

      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {media.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function PostActions({
  liked,
  saved,
  onLike,
  onComment,
  onSave,
}: {
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
}) {
  return (
    <div className="flex justify-between px-4 py-2">
      <div className="flex gap-4">
        <button onClick={onLike} className="transition-transform duration-200 ease-in-out">
          {liked ? (
            <HeartSolid className="w-6 h-6 text-blue-300 scale-125 transition-all duration-300" />
          ) : (
            <HeartOutline className="w-6 h-6 text-black/60 scale-100 transition-all duration-300" />
          )}
        </button>
        <button onClick={onComment}>
          <MessageCircle className="w-6 h-6 text-black/60" />
        </button>
        <button>
          <Share2 className="w-6 h-6 text-black/60" />
        </button>
      </div>

      <button onClick={onSave}>
        {saved ? (
          <BookmarkSolid className="w-6 h-6 text-blue-300 scale-125 transition-all duration-300" />
        ) : (
          <BookmarkOutline className="w-6 h-6 text-black/60 scale-100 transition-all duration-300" />
        )}
      </button>
    </div>
  );
}

export default function PostCard({
  post,
  onPostDeleted,
}: {
  post: Post;
  onPostDeleted?: (postId: string) => void;
}) {
  const hasMedia = post.media_URLs && post.media_URLs.length > 0;
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(post.isSaved ?? false);
  const navigate = useNavigate();

  async function handleSaveToggle() {
    const prev = isSaved;
    setIsSaved(!prev); // optimistic update
    try {
      await savePost(post.id);
    } catch (err) {
      console.error(err);
      setIsSaved(prev); // rollback
    }
  }

  async function handleDeletePost() {
    try {
      await deletePost(post.id);
      onPostDeleted?.(post.id);
    } catch (err) {
      console.error(err);
    }
  }

  function handleEditPost() {
    navigate(`/edit-post/${post.id}`);
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6 max-w-xl mx-auto">
      <PostHeader
        userName={post.userName}
        profileUrl={post.profileUrl}
        profileId={post.userId}
        currentUserId={getUserId()}
        createdAt={post.createdDate}
        onDelete={handleDeletePost}
        onEdit={handleEditPost}
      />

      {!hasMedia && (
        <PostContent
          description={post.description}
          className="px-4 py-8 text-lg font-medium leading-relaxed"
        />
      )}

      {hasMedia && <PostMedia media={post.media_URLs} />}

      <PostActions
        liked={post.isLiked ?? false}
        saved={isSaved}
        onLike={() => console.log("Like")}
        onSave={handleSaveToggle}
        onComment={() => setCommentsOpen(true)}
      />

      <div className="px-4 text-sm font-semibold mt-1">{post.likes ?? 0} likes</div>

      {hasMedia && (
        <PostContent description={post.description} className="px-4 mt-1 text-sm" />
      )}

      <div
        className="px-4 py-2 text-sm text-gray-500 cursor-pointer"
        onClick={() => setCommentsOpen(true)}
      >
        View all {post.comments ?? 0} comments
      </div>

      <CommentsModal
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        postId={post.id}
        currentUserId={getUserId() || ""}
      />
    </div>
  );
}
