import ProfileLogin from '@/components/ProfileLogin';
import ProfileMine from '@/components/ProfileMine';
import useInitUser from '@/hooks/useInitUser';
import { useUserStore } from '@/store/useUserStore';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  useInitUser();
  const { uid,isInitialized,  } = useUserStore();
  if (!isInitialized ) {
    return (
      <SafeAreaView>
        
        <Text className="text-center mt-20 text-lg dark:text-white">正在加载用户信息...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider className="flex-1 bg-white dark:bg-black">
      {uid ? <ProfileMine /> : <ProfileLogin />}
    </SafeAreaProvider>
  );
}
