import 'expo-dev-client';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export const localAssets = {
  exercise: require('../assets/images/brain.svg'),
  training: require('../assets/images/tests.svg'),
  learning: require('../assets/images/book-open-text.svg'),
  statistic: require('../assets/images/chart-line.svg'),
  intro: require('../assets/images/circle-help.svg'),
  time: require('../assets/images/timer.svg'),
  memory: require('../assets/images/cpu.svg'),
};

export const localAnimations = {
  goldMedal: require('../assets/animations/goldMedal.json'),
  silverMedal: require('../assets/animations/silverMedal.json'),
  bronzeMedal: require('../assets/animations/bronzeMedal.json'),
  chill: require('../assets/animations/chill.json'),
  waves: require('../assets/animations/waves.json'),
};

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poiret-One': require('../assets/fonts/PoiretOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const onLayoutRootView = useCallback(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.wrapper} onLayout={onLayoutRootView}>
        <StatusBar backgroundColor="#1d2029" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#1d2029' },
          }}
        ></Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
