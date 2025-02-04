import { useEffect, useRef, useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useAnimatedValue,
} from 'react-native';
import LottieView from 'lottie-react-native';
import useCountUp from '../hooks/useCountUp';

type Props = {
  windowWidth: number;
};

export default function MemoryTestRes({ windowWidth }: Props) {
  const { count: correctCount, countUp: countUpCorrect } = useCountUp(15);
  const { count, countUp } = useCountUp(100, 4000);
  const correctOpacity = useAnimatedValue(0);
  const correctTranslate = useAnimatedValue(-windowWidth);
  const translateY = useAnimatedValue(300);
  const scalesAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(correctOpacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(correctTranslate, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        countUpCorrect();
      }
    });
    Animated.timing(scalesAnim, {
      toValue: { x: 1, y: 1 },
      duration: 2000,
      delay: 7000,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(true);
      countUp();
    });
    Animated.timing(translateY, {
      toValue: 0,
      delay: 9000,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [correctOpacity, correctTranslate, translateY, scalesAnim]);
  return (
    <View style={styles.resContainer}>
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.info,
            {
              opacity: correctOpacity,
            },
            {
              transform: [
                {
                  translateX: correctTranslate,
                },
              ],
            },
          ]}
        >
          <Text style={styles.infoText}>Верно:</Text>
          <Text style={styles.infoText}>{`${correctCount}/30`}</Text>
        </Animated.View>
        <View style={styles.wavesWrapper}>
          <Text style={[styles.infoText, { textAlign: 'center' }]}>
            Оценка:
          </Text>
          <Animated.View
            style={[
              styles.wavesContainer,
              {
                transform: [
                  { scaleX: scalesAnim.x },
                  { scaleY: scalesAnim.y },
                  { perspective: 1000 },
                ],
              },
            ]}
          >
            <Animated.View
              style={[
                { width: '100%' },
                { transform: [{ translateY: translateY }] },
              ]}
            >
              <LottieView
                autoPlay={true}
                loop
                source={require('../../assets/animations/waves.json')}
                style={styles.lottieContainer}
              />
            </Animated.View>
          </Animated.View>
          {showResult && (
            <Text
              style={[styles.infoText, { textAlign: 'center' }]}
            >{`${count}%`}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resContainer: {
    flex: 1,
  },
  animationContainer: {
    flex: 3,
    backgroundColor: '#333a56',
    gap: 32,
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
  wavesWrapper: {
    justifyContent: 'center',
    gap: 32,
  },
  wavesContainer: {
    width: 200,
    height: 200,
    // position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    alignSelf: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#fbd499',
    borderWidth: 5,
  },
  lottieContainer: {
    position: 'absolute',
    width: 195,
    height: 195,
    transform: [
      {
        scaleX: 1.5,
      },
    ],
  },
});
