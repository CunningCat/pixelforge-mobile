import { Post } from "@/types/post";
import { create } from "zustand";


interface PostState{
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  removePost: (uid: string) => void;
  updatePost: (post: Post) => void;
  clearPosts: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (uid) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.post_id !== uid),
    })),
  updatePost: (post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.post_id === post.post_id ? post : p)),
    })),
  clearPosts: () => set({ posts: [] }),
}));