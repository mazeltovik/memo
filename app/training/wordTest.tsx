import { SetStateAction, useState } from 'react';
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
import Countdown from '../components/countDown';
import useOnPressAnim from '../hooks/onPress';

export default function WordTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [time, setTime] = useState(30);
  const [finishedTranslate, setFinishedTranslate] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={wordTestStyles.container}>
        <Countdown
          time={time}
          setTime={setTime}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          finishedTranslate={finishedTranslate}
          setFinishedTranslate={setFinishedTranslate}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const wordTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2029',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
