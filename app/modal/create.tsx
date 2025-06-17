import createPost from '@/services/createPost';
import { useUserStore } from '@/store/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
export default function Create() {
  const { uid,name } = useUserStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  

  const toggleModal = () => setModalVisible(!isModalVisible);


  const handleCreatePost = async () => {
    try {
      await createPost({ PostInfo: { uid: uid, title, content, imageUrl: '', author: name, community: category } });
      router.back();
    } catch (error) {
      console.error('创建帖子失败', error);
    }
    
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='p-2 flex-1'>
          {/* 头部 */}
        <View className='flex flex-row  items-center ml-2 relative justify-center '>
        <TouchableOpacity className='absolute left-2' onPress={() => router.back()}>
          <Ionicons name="arrow-back" className='dark:text-white' color={'#fff'} size={24} />
        </TouchableOpacity>
            <Text className='dark:text-white text-2xl'>内容</Text>
        <TouchableOpacity className='absolute right-2' onPress={handleCreatePost}>
        <Text className='dark:text-blue-500 text-2xl'>发布</Text>
        </TouchableOpacity>
          </View>
        {/* 内容 */}
        <View className='dark:text-white'>
          <TextInput value={title} onChangeText={setTitle} placeholder='请输入标题' className='dark:text-white text-2xl p-4' />
            <TextInput multiline value={content} maxLength={300} onChangeText={setContent} placeholder='请输入内容' className='dark:text-white text-xl p-4' />
            <Text className='dark:text-gray-500 ml-auto text-lg'>{content.length}/300</Text>
        </View>
          {/* 添加分区 */}
          {category ?
            <TouchableOpacity onPress={()=>setCategory('')} className='bg-blue-500 dark:bg-slate-500 p-2 mr-auto rounded-2xl items-center justify-center flex flex-row absolute bottom-20'>
            <Text className='dark:text-white text-2xl'>{category}</Text>  
            <Text className='text-white text-3xl'> x</Text>
            </TouchableOpacity> : <TouchableOpacity onPress={toggleModal} className='bg-blue-500 dark:bg-slate-500 p-2 mr-auto rounded-2xl absolute bottom-20'>
              <Text className='text-white text-xl'>+添加分区</Text>
              
        </TouchableOpacity>}
          
        </View>
        
       
      </TouchableWithoutFeedback>
      <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            onSwipeComplete={toggleModal}
            swipeDirection="down"
            style={{ justifyContent: 'flex-end', margin: 0 }}
            useNativeDriver={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={400}  // 可以调成300~500之间更自然
        animationOutTiming={300}
        
          >
            <View className='dark:bg-gray-950 h-1/2 p-2'>
              <View  />

              <Text className='dark:text-white text-2xl mb-2'>选择一个分区</Text>

          <TouchableOpacity className='p-2' onPress={() => { setCategory('英雄联盟'); toggleModal() }}>
                <Text className='dark:text-blue-500 text-xl'>+英雄联盟</Text>
              </TouchableOpacity>

          <TouchableOpacity className='p-2' onPress={() => { setCategory('数码硬件'); toggleModal() }}>
                <Text className='dark:text-blue-500 text-xl'>+数码硬件</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className='p-2' onPress={() => { setCategory('守望先锋'); toggleModal() }}>
                <Text className='dark:text-blue-500 text-xl'>+守望先锋</Text>
              </TouchableOpacity>
          
              <TouchableOpacity onPress={toggleModal} className='p-6 flex justify-center items-center rounded-md border-spacing-2 mt-auto mb-4'>
                <Text className='dark:text-red-500 text-xl'>取消</Text>
              </TouchableOpacity>
            </View>
          </Modal>
    </KeyboardAvoidingView>
  );
}
