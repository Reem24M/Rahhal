
interface Post {
  id: number;
  image: string;
  caption: string;
}

const posts: Post[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  image:
    "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=600",
  caption: "Peaceful moment in Kyoto 🇯🇵",
}));

const ProfilePosts: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {posts.map((post) => (
        <div key={post.id} className="space-y-1">
          <img
            src={post.image}
            alt="post"
            className="h-40 w-[20rem] rounded-lg object-cover"
          />
          <p className="text-xs text-gray-600 line-clamp-2">
            {post.caption}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
