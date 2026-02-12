import PostHeader from "../components/Shared/postHeader";
import PostUser from "../components/Shared/postUser";
import PostCaption from "../components/Shared/postCaption";
import PostMedia from "../components/Shared/postMedia";
import { useEditPost } from "./hooks/useEditPost";
import { useParams } from "react-router-dom";
import { getUserId } from "../../../utils/auth"; 

const MAX_CHARS = 300;

export default function EditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const userId = getUserId();
  const token = localStorage.getItem("token") || "";

  const {
    caption,
    setCaption,
    media,
    loading,
    user,
    handleUpdatePost,
    fileRef,
    setMedia,
  } = useEditPost(postId!, userId, token);

  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-8">
      {/* Header */}
      <PostHeader
        onPost={handleUpdatePost}
        isPosting={loading}
        title="Edit Post"
        mode="edit"
      />

      {/* User Info */}
      {user && <PostUser {...user} />}

      {/* Caption */}
      <PostCaption
        caption={caption}
        onChange={setCaption}
        maxChars={MAX_CHARS}
      />

      {/* Media */}
      <PostMedia media={media} setMedia={setMedia} fileRef={fileRef} />
    </div>
  );
}







