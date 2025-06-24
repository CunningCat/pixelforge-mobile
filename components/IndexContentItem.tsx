import { Post } from "@/types/post";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function IndexContentItem({ post }: { post: Post }) {
  const router = useRouter();
  return (
    <TouchableOpacity className="flex p-2 bg-white dark:bg-gray-900 rounded-2xl mt-2"
      onPress={() => router.push({
      pathname: '/post/[id]',
      params: { id: post.post_id },
    })}>
      <View className=" flex flex-row items-center gap-2">
        <Image className="w-5 h-5 rounded-full" source={{uri:post.avatar_url}} />
        <Text className="text-black text-2xl dark:text-zinc-300">{post.author}</Text>
      </View>
      <View className=" bg-white dark:bg-gray-900">
        <Text className="text-black text-3xl dark:text-zinc-300">{post.title}</Text>
      </View>
      <View className=" bg-white dark:bg-gray-900" >
        <Text  className="text-black text-2xl dark:text-zinc-300" numberOfLines={3}>{post.content}</Text>
      </View>
      {post.image_url &&
      <View className=" bg-white dark:bg-gray-900">
        <Image className="w-40 h-40" source={{uri:post.image_url}} />
      </View>}
      <View className="p-2 flex flex-row justify-between items-center mt-2">
      {post.community_category?
        <View className=" bg-white dark:bg-gray-500 rounded-2xl p-2">
          <Text className="text-black text-xl dark:text-gray-700">{post.community_category}</Text>
        </View>
          :<Text/>}
        <View className="flex wl-auto flex-row">
          <Text className="text-black text-xl dark:text-gray-500">点赞:{post.likes }</Text>
          <Text className="text-black text-xl dark:text-gray-500">评论:{post.commentnum}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}