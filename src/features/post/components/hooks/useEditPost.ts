import { useEffect, useState, useRef } from "react";
import type { User, EditMedia } from "../services/editPost";

export function useEditPost(postId: string, userId: string, token: string) {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<EditMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const BASE_URL = "https://rahhal-api.runasp.net";
  const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

  // ================= Fetch User =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/Profile/GetUserProfile?ProfileId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const json = await res.json();
        const data = json.data;

        setUser({
          name: data.fullName || "Unknown User",
          username: data.userName || "unknown",
          avatar: data.profilePicture || DEFAULT_AVATAR,
        });
      } catch {
        setUser({
          name: "Unknown User",
          username: "unknown",
          avatar: DEFAULT_AVATAR,
        });
      }
    };

    fetchUser();
  }, [userId, token]);

  // ================= Fetch Post =================
  const fetchPost = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Post/GetById?PostId=${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch post");

      const json = await res.json();
      const data = json.data;

      setCaption(data.description || "");

      const mediaData = data.mediaUrLs || data.media_URLs || [];
      setMedia(
        mediaData.map((m: { id: string; url: string }) => ({
          mediaId: m.id,
          file: m.url.startsWith("http") ? m.url : `${BASE_URL}${m.url}`,
        }))
      );
    } catch (err) {
      console.log("Error fetching post", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // ================= Update Post =================
  const handleUpdatePost = async () => {
    if (!caption.trim()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("ID", postId);
      formData.append("Description", caption);

      media.forEach((m, index) => {
  if (m.file instanceof File) {
    formData.append(`Media[${index}].File`, m.file);

    
    formData.append(`Media[${index}].MediaId`, "");
  } else {

    formData.append(`Media[${index}].MediaId`, m.mediaId);
  }
});

      for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}


      const res = await fetch(`${BASE_URL}/Post/Update`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update post");

      console.log("Post updated successfully ✅");
      

     
      await fetchPost();
    } catch (err) {
      console.log("Error updating post ❌", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    caption,
    setCaption,
    media,
    setMedia,
    loading,
    user,
    handleUpdatePost,
    fileRef,
  };
}
