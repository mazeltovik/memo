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

export default function WordTestRes() {
  const { count: countTime, countUp: countUpTime } = useCountUp(80);
  const { count: correctCount, countUp: countUpCorrect } = useCountUp(15);
  const { count, countUp } = useCountUp(100, 4000);
  const rotateTile1 = useAnimatedValue(-90);
  const rotateTile2 = useAnimatedValue(-90);
  const translateY = useAnimatedValue(300);
  const scalesAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    Animated.timing(rotateTile1, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(countUpTime);
    Animated.timing(rotateTile2, {
      toValue: 0,
      duration: 1000,
      delay: 4000,
      useNativeDriver: true,
    }).start(() => {
      countUpCorrect();
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
  }, [rotateTile1, rotateTile2, translateY, scalesAnim]);
  return (
    <ScrollView style={styles.wrapper}>
      <Animated.View
        style={[
          styles.textView,
          {
            transform: [
              {
                rotateX: rotateTile1.interpolate({
                  inputRange: [-90, 0],
                  outputRange: ['-90deg', '-0deg'],
                }),
              },
              { perspective: 1000 },
            ],
          },
        ]}
      >
        <Text style={styles.text}>время:</Text>
        <Text style={styles.text}>{countTime}</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.textView,
          {
            transform: [
              {
                rotateX: rotateTile2.interpolate({
                  inputRange: [-90, 0],
                  outputRange: ['-90deg', '-0deg'],
                }),
              },
              { perspective: 1000 },
            ],
          },
        ]}
      >
        <Text style={styles.text}>Верно:</Text>
        <Text style={styles.text}>{`${correctCount}/30`}</Text>
      </Animated.View>
      <Text style={[styles.text, { textAlign: 'center', marginTop: 32 }]}>
        Оценка:
      </Text>
      <View style={[styles.wavesWrapper]}>
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
        {showResult && <Text style={styles.text}>{`${count}%`}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 400,
  },
  textView: {
    marginTop: 16,
    marginBottom: 16,
    padding: 8,
    borderRadius: 10,
    height: 50,
    backgroundColor: '#333a56',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textTransform: 'capitalize',
  },
  wavesWrapper: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
    gap: 32,
  },
  wavesContainer: {
    width: 300,
    height: 300,
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#333a56',
    borderWidth: 5,
  },
  lottieContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    transform: [
      {
        scaleX: 1.5,
      },
    ],
  },
});
