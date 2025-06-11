import useInitUser from "@/hooks/useInitUser";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/useUserStore";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
export default function ProfileMine() {
  useInitUser();
  const { uid, name, avatar_url } = useUserStore();
  const handleLogout =async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('登出失败:', error.message);
    } else {
      console.log('已成功退出登录');
      // 可选：清除本地用户状态，例如 Zustand
      useUserStore.getState().clearUser();
      // 可选：跳转到登录页
    }
  }
  return (
    <SafeAreaView>
      <View className="h-16 dark:bg-gray-500 rounded-2xl m-2 flex justify-center p-2">
        <TouchableOpacity
          className=" dark:bg-gray-50  ml-auto"
          onPress={handleLogout}
          >
          <Text className="text-2xl">退出</Text>
        </TouchableOpacity>
      </View>
      <View className="m-2  p-2 h-48 dark:bg-gray-500 rounded-2xl justify-center">
        <View className="flex flex-row items-center gap-2 ">
          <Image className="w-20 h-20 rounded-full" source={{ uri: avatar_url }} />
          <Text className="text-black text-2xl dark:text-white">{name }</Text>
        </View>


        
      </View>
    </SafeAreaView>
  )
}