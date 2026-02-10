import { useEffect, useState } from "react";
import { getAllPosts } from "../../post/components/services/posts.api";
import type { Post } from "../../../types/post";
import PostCard from "../components/PostCard";

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    setLoading(true);
    setError(null);

    try {
      const res = await getAllPosts();

      if (res.isSuccess) {
        setPosts(res.data.items ?? []);
      } else {
        setError(res.message || "Failed to load posts");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ دي أهم function
  function handleRemovePost(postId: string) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPostDeleted={handleRemovePost} 
        />
      ))}
    </div>
  );
}
