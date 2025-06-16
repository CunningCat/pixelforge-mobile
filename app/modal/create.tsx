import uploadImage from '@/services/uploadImg';
import { useUserStore } from '@/store/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
export default function Create() {
  const { uid } = useUserStore();
  const [imageUrl, setImageUrl] = useState('');
  const uploadImgHandle = async () => {
    try {
      const imageUrl = await uploadImage(uid);
      if (imageUrl) {
        setImageUrl(imageUrl);
        console.log('图片上传成功:', imageUrl);
        
      }
    }
    catch (error) {
      console.error('上传图片失败:', error);
    }
  }
  return (
    <View className='p-2'>
      <View className='flex flex-row  items-center ml-2 relative justify-center'>
        <TouchableOpacity className='absolute left-2' onPress={() => router.back()}>
          <Ionicons name="arrow-back" className='dark:text-white' color={'#fff'} size={24} />
        </TouchableOpacity>
        <Text className='dark:text-white text-2xl'>发布</Text>
      </View>
      <View className='dark:text-white'>
        {imageUrl ? <Image className='w-80 h-80' source={{ uri: imageUrl }} onError={(e) => {
    console.error('图片加载失败', e.nativeEvent.error);
  }}/>
          : <TouchableOpacity className='dark:bg-slate-900 flex w-40 h-40 mt-10 items-center justify-center' onPress={uploadImgHandle}>
          <Text className='text-6xl dark:text-slate-700'>+</Text>
        </TouchableOpacity>}
        
      </View>
    </View>
  );
}