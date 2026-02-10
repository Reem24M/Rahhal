const BASE_URL = "https://rahhal-api.runasp.net";

export async function fetchComments(postId: string, page = 1, pageSize = 20) {
  const params = new URLSearchParams({
    PostId: postId,
    PageNumber: page.toString(),
    PageSize: pageSize.toString(),
    SortByLastAdded: "true",
  });

  const res = await fetch(`${BASE_URL}/Comment/AllCommentsToPost?${params.toString()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : { data: { items: [] } };
}

export async function fetchReplies(commentId: string, page = 1, pageSize = 20) {
  const params = new URLSearchParams({
    CommentId: commentId,
    PageNumber: page.toString(),
    PageSize: pageSize.toString(),
  });

  const res = await fetch(`${BASE_URL}/Comment/AllRepliesToComment?${params.toString()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : { data: { items: [] } };
}

type CreateCommentBody = {
  profileId: string;
  postId: string;
  description: string;
  parentCommentId?: string;
};

export async function createComment(
  profileId: string,
  postId: string,
  description: string,
  parentCommentId?: string
) {
  const body: CreateCommentBody = { profileId, postId, description };
  if (parentCommentId) body.parentCommentId = parentCommentId;

  const res = await fetch(`${BASE_URL}/Comment/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}


type EditCommentBody = {
  commentId: string;
  description: string;
};

export async function editComment(commentId: string, description: string) {
  const body: EditCommentBody = {  commentId, description };

  const res = await fetch(`${BASE_URL}/Comment/Update`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}


export async function deleteComment(commentId: string) {
  const res = await fetch(`${BASE_URL}/Comment/Delete`, {
    method: "DELETE", 
    headers: { "Content-Type": "application/json" }, // MUST include this
    body: JSON.stringify({ commentId }), // send ID in body
  });

  if (!res.ok) throw new Error("Failed to delete comment");

  // Some DELETE APIs return empty response, so wrap in try-catch
  try {
    return await res.json();
  } catch {
    return { isSuccess: res.ok };
  }
}



export async function likeComment(userId: string, commentId: string) {
  const res = await fetch(`${BASE_URL}/post/addlikecomment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, commentId }),
  });
  return res.json();
}
