
import IndexContent from '@/components/IndexContent';
import IndexHeader from '@/components/IndexHeader';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <IndexHeader />
        <IndexContent />
      </SafeAreaView>
      
    </SafeAreaProvider>
);

}