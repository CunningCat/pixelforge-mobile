import { getLatestNews } from "@/services/getLatestNews";
import { usePostStore } from "@/store/usePostStore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import IndexContentItem from "./IndexContentItem";
export default function IndexContent() {
  const posts = usePostStore((state) => state.posts);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    if (!hasMore) {
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    const res = await getLatestNews();
    usePostStore.getState().setPosts(res);
    setHasMore(false); // 已经没有更多了
    
  
    setLoading(false);
  }
  

  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <FlatList  
    data={posts}
    keyExtractor={(item) => item.post_id.toString()}
    renderItem={({ item }) => <IndexContentItem post={item} />}
    contentContainerStyle={{ paddingBottom: 20 }}
    onRefresh={loadPosts}     // 下拉刷新
    refreshing={loading}
    ListEmptyComponent={<View><Text>暂无帖子</Text></View>}
  />
  );
}