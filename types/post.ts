export type Post={
  post_id: string;
  title: string;
  content: string;
  image_url: string;
  created_time: string;
  author: string;
  commentnum: number;
  likes: number;
  community_category: string;
  avatar_url?: string;
}