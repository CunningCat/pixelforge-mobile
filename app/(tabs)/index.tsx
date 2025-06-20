
import IndexContent from '@/components/IndexContent';
import IndexHeader from '@/components/IndexHeader';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  const [selectCommunity, setSelectCommunity] = useState('首页');
  const onselectCommunity = (community: string) => {
    if (community === selectCommunity) return;
    setSelectCommunity(community);
    
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <IndexHeader onselectCommunity={onselectCommunity} selectCommunity={selectCommunity}/>
        <IndexContent selectCommunity={selectCommunity}/>
      </SafeAreaView>
      
    </SafeAreaProvider>
);

}