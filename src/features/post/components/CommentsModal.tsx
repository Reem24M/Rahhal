import { useEffect, useRef, useState } from "react";
import { X, Heart, MoreHorizontal } from "lucide-react";
import * as commentApi from "../components/services/commentApi";

type CommentItem = {
  commentId: string;
  profileId: string;
  userName: string;
  profilePicture: string | null;
  description: string;
  createdDate: string;
  likesCount: number;
  repliesCount: number;
};

type ReplyItem = {
  replyId: string;
  profileId: string;
  userName: string;
  profilePicture: string | null;
  description: string;
  createdDate: string;
  likesCount: number;
  repliesCount: number;
};

type CommentsModalProps = {
  open: boolean;
  onClose: () => void;
  postId: string;
  currentUserId: string;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
}

const FALLBACK_AVATAR =
  "https://cdn.vectorstock.com/i/500p/48/12/travel-icon-male-user-person-profile-avatar-vector-20894812.jpg";

export function CommentsModal({
  open,
  onClose,
  postId,
  currentUserId,
}: CommentsModalProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyingToName, setReplyingToName] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const [menuOpenMap, setMenuOpenMap] = useState<Record<string, boolean>>({});
  const [repliesMap, setRepliesMap] = useState<Record<string, ReplyItem[]>>({});
  const [repliesOpenMap, setRepliesOpenMap] = useState<Record<string, boolean>>({});

  const commentsEndRef = useRef<HTMLDivElement>(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await commentApi.fetchComments(postId);
      setComments(data.data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async (parentId: string) => {
    try {
      const data = await commentApi.fetchReplies(parentId);
      setRepliesMap((prev) => ({ ...prev, [parentId]: data.data.items || [] }));
    } catch (err) {
      console.error(err);
      setRepliesMap((prev) => ({ ...prev, [parentId]: [] }));
    }
  };

  const handleAddComment = async (parentId?: string) => {
    const text = parentId ? replyText : newComment;
    if (!text.trim()) return;

    await commentApi.createComment(currentUserId, postId, text.trim(), parentId);

    if (parentId) {
      setReplyText("");
      setReplyingTo(null);
      setReplyingToName(null);
      setRepliesOpenMap((prev) => ({ ...prev, [parentId]: true }));
      await fetchReplies(parentId);
    } else {
      setNewComment("");
      await fetchComments();
    }

    setTimeout(
      () => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const handleEdit = async (id: string) => {
    if (!editText.trim()) return;
    await commentApi.editComment(id, editText.trim());
    setEditingId(null);
    fetchComments();
    Object.keys(repliesMap).forEach((parentId) => fetchReplies(parentId));
  };

  const handleDelete = async (id: string, parentId?: string) => {
    await commentApi.deleteComment(id);
    if (parentId) {
      setRepliesMap((prev) => ({
        ...prev,
        [parentId]: prev[parentId]?.filter((r) => r.replyId !== id) || [],
      }));
    } else {
      fetchComments();
    }
  };

  const handleLike = async (id: string, parentId?: string) => {
    await commentApi.likeComment(currentUserId, id);
    if (parentId) fetchReplies(parentId);
    else fetchComments();
  };

  const toggleMenu = (key: string) =>
    setMenuOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));

  const closeAllMenus = () => setMenuOpenMap({});

  const toggleReplies = async (commentId: string) => {
    const isOpen = !!repliesOpenMap[commentId];
    if (isOpen) {
      setRepliesOpenMap((prev) => ({ ...prev, [commentId]: false }));
      return;
    }
    setRepliesOpenMap((prev) => ({ ...prev, [commentId]: true }));
    if (!repliesMap[commentId]) {
      await fetchReplies(commentId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-container")) closeAllMenus();
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) fetchComments();
  }, [open, postId]);

  useEffect(() => {
    if (!open) {
      setReplyingTo(null);
      setReplyingToName(null);
      setEditingId(null);
      setMenuOpenMap({});
      setRepliesMap({});
      setRepliesOpenMap({});
    }
  }, [open]);

  if (!open) return null;

  const renderComment = (comment: CommentItem | ReplyItem, parentId?: string) => {
    const isReply = !!parentId;
    const id = isReply
      ? (comment as ReplyItem).replyId
      : (comment as CommentItem).commentId;

    const menuKey = `${isReply ? "r" : "c"}-${id}`;

    return (
      <div key={id} className="flex gap-3 w-full">
        <img
          src={comment.profilePicture || FALLBACK_AVATAR}
          className={`${
            isReply ? "w-7 h-7" : "w-9 h-9"
          } rounded-full object-cover mt-0.5 flex-shrink-0`}
          alt="avatar"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <div className="flex-1 min-w-0">
              {editingId === id ? (
                <div className="flex gap-2 flex-wrap w-full">
                  <input
                    className="flex-1 min-w-0 rounded-full border px-4 py-2 text-sm outline-none focus:border-black"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => handleEdit(id)}
                    className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full bg-black text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full border"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl bg-gray-50 border border-black/5 px-3 py-2">
                  <p className="text-sm leading-5 break-words">
                    <span className="font-semibold mr-1">{comment.userName}</span>
                    {comment.description}
                  </p>
                </div>
              )}
            </div>

            {/* Floating 3 dots menu */}
            <div className="relative menu-container flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(menuKey);
                }}
                className="p-2 rounded-full hover:bg-black/5 z-50"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {menuOpenMap[menuKey] && (
                <div className="fixed  right-3 z-50 bg-white border border-black/10 rounded-xl shadow-lg w-36 overflow-hidden">
                  <div className="flex flex-col">
                    {comment.profileId === currentUserId ? (
                      <>
                        <button
                          className="w-full px-3 py-2 text-sm hover:bg-black/5 text-left"
                          onClick={() => {
                            setEditingId(id);
                            setEditText(comment.description);
                            closeAllMenus();
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full px-3 py-2 text-sm hover:bg-black/5 text-left text-red-600"
                          onClick={() => handleDelete(id, parentId)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className="w-full px-3 py-2 text-sm hover:bg-black/5 text-left"
                        onClick={() => console.log("Report")}
                      >
                        Report
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            <span>{formatDate(comment.createdDate)}</span>

            <button
              onClick={() => handleLike(id, parentId)}
              className="flex items-center gap-1 hover:text-black"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="font-medium">{comment.likesCount}</span>
            </button>

            {/* Reply button only for main comments */}
            {!parentId && (
              <button
                onClick={() => {
                  setReplyingTo(id);
                  setReplyingToName(comment.userName);
                }}
                className="font-medium hover:text-black"
              >
                Reply
              </button>
            )}
          </div>

          {!isReply && comment.repliesCount > 0 && (
            <div className="mt-2">
              <button
                onClick={() => toggleReplies(id)}
                className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-2"
              >
                <span className="h-px w-8 bg-gray-300" />
                {repliesOpenMap[id] ? "Hide replies" : `View ${comment.repliesCount} replies`}
              </button>
            </div>
          )}

          {!isReply && repliesOpenMap[id] && (
            <div className="mt-2 flex gap-3 w-full">
              <div className="w-9 flex justify-center">
                <div className="relative w-px bg-gray-200 rounded-full">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-200" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-200" />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1 min-w-0">
                {!repliesMap[id] ? (
                  <div className="text-xs text-gray-500 py-2">Loading replies...</div>
                ) : repliesMap[id].length === 0 ? (
                  <div className="text-xs text-gray-500 py-2">No replies yet</div>
                ) : (
                  repliesMap[id].map((r) => renderComment(r, id))
                )}
              </div>
            </div>
          )}

          {replyingTo === id && !parentId && (
            <div className="mt-3 w-full">
              <div className="text-xs text-gray-500 mb-2">
                Replying to{" "}
                <span className="font-semibold text-gray-700">@{replyingToName}</span>
              </div>

              <div className="flex gap-2 items-center flex-wrap w-full">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 min-w-0 rounded-full border px-4 py-2 text-sm outline-none focus:border-black"
                />

                <button
                  onClick={() => handleAddComment(id)}
                  className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-full ${
                    replyText.trim()
                      ? "text-black hover:bg-black/5"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!replyText.trim()}
                >
                  Post
                </button>

                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyingToName(null);
                    setReplyText("");
                  }}
                  className="flex-shrink-0 text-sm font-semibold px-3 py-2 rounded-full hover:bg-black/5"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 w-[94%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="w-8" />
          <div className="font-semibold">Comments</div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 space-y-5">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-500">No comments yet</div>
          ) : (
            comments.map((c) => renderComment(c))
          )}
          <div ref={commentsEndRef} />
        </div>

        <div className="border-t px-4 py-3 flex gap-3 items-center bg-white flex-wrap">
          <input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 min-w-0 rounded-full border px-4 py-2 text-sm outline-none focus:border-black"
          />

          <button
            onClick={() => handleAddComment()}
            className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-full ${
              newComment.trim()
                ? "text-black hover:bg-black/5"
                : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
