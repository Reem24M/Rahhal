import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { User } from "../services/createPost";
import type { EditMedia } from "../services/createPost"; 


export function useCreatePost(userId: string, token: string) {
  const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<EditMedia[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isPosting, setIsPosting] = useState(false);
 const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://rahhal-api.runasp.net/Profile/GetUserProfile", {
          params: { ProfileId: userId },
          headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
        });
        const data = res.data.data;
        setUser({
          name: data.fullName || "Unknown User",
          username: data.userName || "unknown",
          avatar: data.profilePicture || DEFAULT_AVATAR,
        });
      } catch (err) {
        console.log("Error fetching user", err);
        setUser({ name: "Unknown User", username: "unknown", avatar: DEFAULT_AVATAR });
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleCreatePost = async () => {
    if (!caption && media.length === 0) return;

    setIsPosting(true);

    const formData = new FormData();
      media.forEach((img) => {
    if (img.file instanceof File) {
      formData.append("Files", img.file); 
    }
  });
    formData.append("UserId", userId);
    formData.append("Description", caption);

    try {
      const res = await axios.post("https://rahhal-api.runasp.net/Post/Create", formData, {
        headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
      });
      console.log("Post created", res.data);
      setCaption("");
      setMedia([]);
    } catch (err: any) {
      console.log("ERROR", err.response?.data);
    } finally {
      setIsPosting(false);
    }
  };

  return { caption, setCaption, media, setMedia, user, isPosting, handleCreatePost, fileRef };
}
