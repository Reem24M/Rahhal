import PostHeader from "./Shared/postHeader";
import PostUser from "./Shared/postUser";
import PostCaption from "./Shared/postCaption";
import PostMedia from "./Shared/postMedia";
import { useCreatePost } from "./hooks/useCreatePost";
import { getUserId } from "../../../utils/auth"; 
const MAX_CHARS = 300;

export default function CreatePostPage() {
    const userId = getUserId();
    const token = localStorage.getItem("token") || "";


  const { caption, setCaption, media, setMedia, user, isPosting, handleCreatePost, fileRef } =
    useCreatePost(userId, token);

  return (
    <div className="box px-4 py-8 sm:px-8 sm:py-10 gap-8">
      <PostHeader onPost={handleCreatePost} isPosting={isPosting} mode="create" />

      {user && <PostUser {...user} />}

      <PostCaption
        caption={caption}
        onChange={setCaption}
        maxChars={MAX_CHARS}
      />

      <PostMedia media={media} setMedia={setMedia} fileRef={fileRef} />

    </div>
  );
}




