export type PostDetail = {
  created_time: string;
  title: string;
  content: string;
  image_url?: string;
  id: string;
  author: string;
  likes: number;
  commentnum: number;
  community_category?: string;
  avatar_url?: string
};