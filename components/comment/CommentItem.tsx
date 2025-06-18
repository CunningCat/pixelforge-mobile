import { Comments } from "@/types/comment";
import { Image, Text, View } from "react-native";
export default function CommentItem(props: Comments) {
  

  return (
    <View>
      <View className="flex flex-row gap-2 p-2">
        <Image className="w-8 h-8 rounded-full" source={{ uri: props.user_avatar }} />
        <View className="flex ">
          <Text className="text-black text-2xl dark:text-slate-400">{props.author}</Text>
          
          <Text className="text-black text-lg dark:text-gray-500">{props.created_at}</Text>
          <Text className="text-black text-xl dark:text-slate-400">{props.content}</Text>
        </View>
      </View>
      
    </View>
  );
}