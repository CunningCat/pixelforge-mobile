import { getCommunityNews } from "@/services/getCommunityNews";
import { getLatestNews } from "@/services/getLatestNews";
import getSelfPost from "@/services/getSelfPost";
import { usePostStore } from "@/store/usePostStore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import IndexContentItem from "./IndexContentItem";
export default function IndexContent({ uid, selectCommunity='首页' }: { uid?: string, selectCommunity?: string }) {
  const posts = usePostStore((state) => state.posts);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    
    if (loading) {
      return;
    }
    setLoading(true);
    
    if(uid){
      const res = await getSelfPost(uid);
      usePostStore.getState().setPosts(res);
    }
    else if (selectCommunity === '首页') {
      const res = await getLatestNews();
      usePostStore.getState().setPosts(res);
    }
    else if (selectCommunity !== '') {
      const res =await getCommunityNews(0, 5, selectCommunity);
      usePostStore.getState().setPosts(res);
    }
    setLoading(false);
  }
  useEffect(() => {
    loadPosts();
  }, [selectCommunity]);

  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <FlatList  
    data={posts}
    keyExtractor={(item) => item.post_id.toString()}
    renderItem={({ item }) => <IndexContentItem post={item} />}
    contentContainerStyle={{ paddingBottom: 40 }}
    onRefresh={loadPosts}     // 下拉刷新
    refreshing={loading}
    ListEmptyComponent={<View className="flex items-center"><Text className="text-black text-3xl dark:text-zinc-300">---暂无帖子---</Text></View>}
  />
  );
}