import { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Animated,
  useAnimatedValue,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import Clock from '../components/clock';
import useOnPressAnim from '../hooks/onPress';
import formatDuration from '../scripts/formatDuration';

export default function CountTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { scales, onPress } = useOnPressAnim();
  const [finishedAnim, setFinishedAnim] = useState(false);
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(0);
  const timeOpacity = useAnimatedValue(0);
  const timeTranslate = useAnimatedValue(-windowWidth);
  useEffect(() => {
    const animated = Animated.parallel([
      Animated.timing(timeOpacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(timeTranslate, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);
    if (stop) {
      animated.start();
    }
  }, [stop]);
  return (
    <View style={countTestStyles.container}>
      <Clock
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        finishedAnim={finishedAnim}
        setFinishedAnim={setFinishedAnim}
        stop={stop}
        time={time}
        setTime={setTime}
      />
      {finishedAnim && !stop && (
        <View>
          <Pressable
            onPress={() => {
              onPress();
              setStop(!stop);
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
      {stop && (
        <View style={countTestStyles.resContainer}>
          <Animated.View
            style={[
              countTestStyles.info,
              {
                opacity: timeOpacity,
              },
              {
                transform: [
                  {
                    translateX: timeTranslate,
                  },
                ],
              },
            ]}
          >
            <Text style={countTestStyles.infoText}>Время:</Text>
            <Text style={countTestStyles.infoText}>
              {formatDuration(0, time)}
            </Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const countTestStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  pressContainer: {
    borderRadius: '10%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  pressText: {
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    color: '#fbd499',
    textAlign: 'center',
    backgroundColor: '#252b43',
  },
  resContainer: {
    flex: 0.5,
    backgroundColor: '#333a56',
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textTransform: 'capitalize',
  },
  infoText: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
});
