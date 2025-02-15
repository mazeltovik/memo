import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poiret-One': require('../assets/fonts/PoiretOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.wrapper}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#1d2029',
  },
});
