import React from 'react'
import PostsList from "../../features/post/components/PostList";
import FeedHeader from "../../features/post/components/feedHeader";
export default function HomeFeed() {
   // Inline mock data
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <FeedHeader />
     <PostsList />

    </div>
  )
}
