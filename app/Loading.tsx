import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Loading () {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black justify-center items-center">
       <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  )
} 