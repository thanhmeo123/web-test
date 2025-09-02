// src/services/postService.js
const API_URL = "https://jsonplaceholder.typicode.com";

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts?_limit=10`);
  return res.json();
}

export async function fetchPostDetail(id) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
}

export async function fetchComments(postId) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  return res.json();
}

export async function addComment(postId, comment) {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  return res.json();
}