import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('登录成功');
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('注册成功，请前往邮箱验证');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center ">
      <View className="flex-1   max-h-80 w-4/5 p-10">
        <View className="">
          <Text className="text-black dark:text-white text-2xl">账号</Text>
        </View>
        <TextInput
          className="dark:bg-gray-800  p-2 dark:text-gray-200 h-[50px] border-2 rounded-2xl"
          placeholder="@example.com"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <View className="mt-2">
          <Text className="text-black dark:text-gray-200 text-2xl">密码</Text>
        </View>
        <TextInput
          className="dark:bg-gray-800  p-2 dark:text-gray-200 h-[50px] border-2 rounded-2xl"
          placeholder="密码"
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
      </View>
      {/* 登录按钮 */}
      <TouchableOpacity
        className="dark:bg-gray-800 w-3/4 flex items-center justify-center mt-10 p-2 dark:text-gray-200 h-[50px] border-2 rounded-2xl "
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">登录</Text>
      </TouchableOpacity>
      {/* 注册按钮 */}
      <TouchableOpacity
        className="dark:bg-gray-800 w-3/4 flex items-center justify-center mt-5 p-2 dark:text-gray-200 h-[50px] border-2 rounded-2xl"
        onPress={handleRegister}
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">注册</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
