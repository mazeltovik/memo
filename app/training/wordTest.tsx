import { SetStateAction, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Animated,
  useAnimatedValue,
  ScrollView,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Countdown from '../components/countDown';
import WordsList from '../components/wordsList';
import useOnPressAnim from '../hooks/onPress';

export default function WordTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [time, setTime] = useState(50);
  const [finishedTranslate, setFinishedTranslate] = useState(false);
  const { scales, onPress } = useOnPressAnim();
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
        {finishedTranslate && <WordsList windowWidth={windowWidth} />}
        <Animated.View
          style={[
            wordTestStyles.pressContainer,
            {
              transform: [{ scaleX: scales.x }, { scaleY: scales.y }],
            },
          ]}
        >
          <Pressable
            onPress={() => {
              onPress();
            }}
          >
            <Animated.Text style={[wordTestStyles.pressText]}>
              вперед
            </Animated.Text>
          </Pressable>
        </Animated.View>
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
  pressContainer: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#333a56',
  },
  pressText: {
    paddingTop: 8,
    paddingBottom: 8,
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
