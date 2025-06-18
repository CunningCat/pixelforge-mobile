import CommentItem from '@/components/comment/CommentItem';
import addComment from '@/services/addComment';
import getCommentList from '@/services/getCommentList';
import { getPostInfo } from '@/services/getPostInfo';
import { useUserStore } from '@/store/useUserStore';
import { Comments } from '@/types/comment';
import { PostDetail } from '@/types/postdetail';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loading from '../Loading';
export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const { uid, name, avatar_url } = useUserStore();
  const [data, setData] = useState<PostDetail | null>(null);
  const [commentlist, setCommentList] = useState<Comments[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const navigation = useNavigation();
  const textInputRef = useRef<TextInput>(null);
  const [isclickcomment, setIsClickComment] = useState(false);
  

  

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

  //添加评论
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    
    const access = await addComment({ user_id: uid, post_id: String(id), content: commentText.trim(), user_avatar: avatar_url, author: name });
    if (access) {
      setCommentText('');
      textInputRef.current?.clear();
      textInputRef.current?.blur();
      
    }
  }
  //帖子正文
  const renderPostHeader = () => (
    <View className='mb-10 p-2'>
      <View className='flex-1'>
        <View className='items-center justify-center'>
          {data?.image_url && <Image className='w-96 h-96' source={{ uri: data?.image_url }} />}
        </View>
        <View className='p-2'>
          <View className='flex flex-row  gap-2'>
            <Image className='w-8 h-8 rounded-full'  source={{ uri: data?.avatar_url }} />
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
  const postHeader = useMemo(() => renderPostHeader(), [data]);
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
    
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 '>
      <SafeAreaView className='flex-1 'edges={isclickcomment? ['top'] : ['top', 'bottom']} >
   
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
        ListHeaderComponent={postHeader}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 40 }}
      />}
      
      <View className='flex p-2 '>
      
        <TextInput
          multiline
          onFocus={() => setIsClickComment(true)}
          onBlur={() => setIsClickComment(false)}
          className="p-2 dark:bg-slate-900  w-full dark:text-white"
          placeholder="请输入评论"
          ref={textInputRef}
          onChangeText={setCommentText} 
            style={{ height: isclickcomment ? 100 : 32  }}
          />
          {isclickcomment &&
            <TouchableOpacity className='flex flex-row gap-2 justify-end mt-2 ml-auto pr-2' onPress={handleAddComment}>
              <Text className='text-lg dark:text-white'>发送</Text>
              <Ionicons name="send" className='dark:text-white' color={'#fff'} size={24} />
            
            </TouchableOpacity>
          }
          </View>
         
      </SafeAreaView>
      </KeyboardAvoidingView>
     
  );
}

