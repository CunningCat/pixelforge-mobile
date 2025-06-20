import { getLatestNews } from "@/services/getLatestNews";
import getSelfPost from "@/services/getSelfPost";
import { usePostStore } from "@/store/usePostStore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import IndexContentItem from "./IndexContentItem";
export default function IndexContent({uid}:{uid?:string}) {
  const posts = usePostStore((state) => state.posts);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    
    if (loading) {
      return;
    }
    setLoading(true);
    console.log(uid);
    if(uid){
      const res = await getSelfPost(uid);
      usePostStore.getState().setPosts(res);
    }
    else {
      const res = await getLatestNews();
      usePostStore.getState().setPosts(res);
    }
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
    contentContainerStyle={{ paddingBottom: 40 }}
    onRefresh={loadPosts}     // 下拉刷新
    refreshing={loading}
    ListEmptyComponent={<View><Text>暂无帖子</Text></View>}
  />
  );
}