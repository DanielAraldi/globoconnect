import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './src/config';
import { PostProvider } from './src/hooks';
import { Routes } from './src/routes';
import { getStatusBarHeight } from './src/utils';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  async function hiddenSphash(): Promise<void> {
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    if (fontsLoaded) hiddenSphash();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          style='light'
          backgroundColor={theme.colors.transparent}
          translucent
        />

        <PostProvider>
          <Routes />
        </PostProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: theme.colors.background.main,

    paddingTop: getStatusBarHeight(),
  },
});
