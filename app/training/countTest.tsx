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
import Clock from '../components/clock';
import useOnPressAnim from '../hooks/onPress';
import isNum from '../scripts/isNumber';

export default function CountTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { scales, onPress } = useOnPressAnim();
  const [finishedAnim, setFinishedAnim] = useState(false);
  const [text, onChangeText] = useState('');
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(0);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={countTestStyles.container}>
        <Clock
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          finishedAnim={finishedAnim}
          setFinishedAnim={setFinishedAnim}
          stop={stop}
          time={time}
          setTime={setTime}
        />
        {finishedAnim && (
          <View>
            <TextInput
              style={countTestStyles.textInput}
              onChangeText={onChangeText}
              value={text}
              placeholder="Введите время"
              placeholderTextColor={'white'}
            />
            <Pressable
              onPress={() => {
                onPress();
                if (isNum(text)) {
                  onChangeText('');
                  setStop(!stop);
                }
              }}
              style={[countTestStyles.pressContainer]}
            >
              <Animated.Text
                style={[
                  countTestStyles.pressText,
                  {
                    transform: [{ scaleX: scales.x }, { scaleY: scales.y }],
                  },
                ]}
              >
                Стоп
              </Animated.Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const countTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
    paddingLeft: 16,
    paddingRight: 16,
  },
  stopContainer: {},
  textInput: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#252b43',
    color: 'white',
  },
  pressContainer: {
    borderRadius: '10%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  pressText: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    backgroundColor: '#252b43',
  },
});
