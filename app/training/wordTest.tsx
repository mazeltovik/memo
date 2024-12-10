import { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Animated,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import useOnPressAnim from '../hooks/onPress';

export default function WordTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={wordTestStyles.container}></SafeAreaView>
    </SafeAreaProvider>
  );
}

const wordTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
