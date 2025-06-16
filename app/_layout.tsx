import { useColorScheme } from '@/hooks/useColorScheme';
import useInitUser from '@/hooks/useInitUser';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';

import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useInitUser();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
 
  
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="modal/create" options={{ presentation: 'modal', headerShown: false,contentStyle: { paddingTop: 0 },  gestureEnabled: false  }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
