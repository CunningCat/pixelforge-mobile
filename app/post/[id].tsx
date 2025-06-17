import CommentItem from '@/components/comment/CommentItem';
import getCommentList from '@/services/getCommentList';
import { getPostInfo } from '@/services/getPostInfo';
import { Comments } from '@/types/comment';
import { PostDetail } from '@/types/postdetail';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../Loading';
export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<PostDetail | null>(null);
  const [commentlist, setCommentList] = useState<Comments[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
 

  useEffect(() => {
    const loadData = async () => {
    setLoading(true); // 开始加载

    try {
      const [postResult, commentResult] = await Promise.all([
        getPostInfo(String(id)),
        getCommentList({ post_id: String(id) }),
      ]);

      if (postResult?.data) {
        setData(postResult.data);
      }

      if (commentResult) {
        setCommentList(commentResult);
      }

    } catch (error) {
      console.error('加载帖子或评论失败:', error);
    } finally {
      setLoading(false); // 不管是否报错都关闭加载状态
    }
  };

  loadData();

    return () => {
      setData(null);
    }
  }, []);

  
  //帖子正文
  const renderPostHeader = () => (
    <View className='mb-10 p-2'>
      <View className='flex-1'>
        <View className='items-center justify-center'>
          {data?.image_url && <Image className='w-80 h-80' source={{ uri: data?.image_url }} />}
        </View>
        <View className='p-2'>
          <View className='flex flex-row  gap-2'>
            <Image className='w-8 h-8 rounded-full' source={{ uri: data?.avatar_url }} />
            <Text className='text-lg dark:text-white '>{data?.author}</Text>
          </View>
          <Text className='text-2xl dark:text-white'>{data?.title}</Text>
          <Text className='text-lg dark:text-white'>{data?.content}</Text>
          <View className='flex flex-row gap-2'>
            <Text className='text-lg dark:text-slate-300'>分区:{data?.community_category}</Text>
          </View>
          <Text className='text-lg dark:text-slate-300'>{data?.created_time}</Text>
        </View>
      </View>
    </View>
  );

  const renderCommentItem = ({ item }: { item: Comments }) => (
    <CommentItem
      user_avatar={item.user_avatar}
      author={item.author}
      content={item.content}
      created_at={item.created_at}
      id={item.id}
    />
  );
  
  return (
    <SafeAreaView className='flex-1'>
      
      <View className='head flex-row  items-center dark:bg-black p-2 mb-2 relative '>
        <TouchableOpacity className='w-20 h-20 z-10 top-1/2 left-3 absolute' onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" className='dark:text-white' color={'#fff'} size={24} />
        </TouchableOpacity>
        <Text className='headtext text-center w-full'>正文</Text>
        </View>
      {loading?<Loading />:<FlatList 
        data={commentlist}
        keyExtractor={(item) => item.id}
        renderItem={renderCommentItem}
        ListHeaderComponent={renderPostHeader}
        contentContainerStyle={{ paddingBottom: 40 }}
      />}
      
      
    </SafeAreaView>
  );
}

