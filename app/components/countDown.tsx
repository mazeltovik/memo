import { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  useAnimatedValue,
  Animated,
  Vibration,
} from 'react-native';
import useWaveAnim from '../hooks/useWaveAnim';

type CountdownTypes = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  windowWidth: number;
  windowHeight: number;
  finishedTranslate: boolean;
  setFinishedTranslate: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Countdown({
  time,
  setTime,
  windowHeight,
  windowWidth,
  finishedTranslate,
  setFinishedTranslate,
}: CountdownTypes) {
  const {
    animatedWaves,
    opacity,
    scaleInnerWave,
    scaleOuterWave,
    start,
    setStart,
  } = useWaveAnim();
  const coords = useRef(new Animated.ValueXY()).current;
  const scalesAnim = useRef(new Animated.ValueXY()).current;
  const hoursDegree = useAnimatedValue(180);
  const secondsDegree = useAnimatedValue(225);
  useEffect(() => {
    Animated.parallel([
      Animated.parallel([
        Animated.timing(hoursDegree, {
          toValue: 540,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(secondsDegree, {
          toValue: 540,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scalesAnim, {
            toValue: { x: 1.5, y: 1.5 },
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scalesAnim, {
            toValue: { x: 1, y: 1 },
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(coords, {
            toValue: { x: windowWidth / 2 - 54, y: -windowHeight / 2 + 96 },
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(({ finished }) => {
      setFinishedTranslate(finished);
    });
  }, [scalesAnim, coords, hoursDegree, secondsDegree]);
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (time < 27 && !start) {
      setStart(true);
      animatedWaves.start();
      // Vibration.vibrate();
    }
    if (time == 0) {
      setStart(false);
      animatedWaves.stop();
    }
    if (time != 0 && finishedTranslate) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time, finishedTranslate, opacity, scaleInnerWave, scaleOuterWave]);
  return (
    <Animated.View
      style={[
        countdownStyles.container,
        {
          transform: [
            { scaleX: scalesAnim.x },
            { scaleY: scalesAnim.y },
            {
              translateX: coords.x,
            },
            {
              translateY: coords.y,
            },
            { perspective: 1000 },
          ],
        },
      ]}
    >
      <Animated.View style={countdownStyles.countdownContainer}>
        {!finishedTranslate && (
          <Animated.View
            style={[
              countdownStyles.clockArrow,
              {
                transform: [
                  {
                    rotate: hoursDegree.interpolate({
                      inputRange: [180, 540],
                      outputRange: ['180deg', '540deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={countdownStyles.hours}></View>
          </Animated.View>
        )}
        {!finishedTranslate && (
          <Animated.View
            style={[
              countdownStyles.clockArrow,
              {
                transform: [
                  {
                    rotate: secondsDegree.interpolate({
                      inputRange: [225, 540],
                      outputRange: ['225deg', '540deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={countdownStyles.seconds}></View>
          </Animated.View>
        )}
        {finishedTranslate && (
          <Text style={countdownStyles.countdownText}>{time}</Text>
        )}
      </Animated.View>
      <Animated.View
        style={[
          countdownStyles.outerWave,
          {
            opacity: opacity,
            transform: [
              { scaleX: scaleOuterWave.x },
              { scaleY: scaleOuterWave.y },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          countdownStyles.innerWave,
          {
            opacity: opacity,
            transform: [
              { scaleX: scaleInnerWave.x },
              { scaleY: scaleInnerWave.y },
            ],
          },
        ]}
      />
    </Animated.View>
  );
}

const countdownStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    width: 140,
    height: 140,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2029',
  },
  countdownContainer: {
    position: 'absolute',
    zIndex: 3,
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#495278',
  },
  countdownText: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  outerWave: {
    position: 'absolute',
    zIndex: 1,
    width: 140,
    height: 140,
    borderRadius: '50%',
    backgroundColor: '#1d2029',
    borderWidth: 5,
    borderColor: '#495278',
  },
  innerWave: {
    position: 'absolute',
    zIndex: 2,
    width: 140,
    height: 140,
    borderRadius: '50%',
    backgroundColor: '#495278',
  },
  clockArrow: {
    width: 70,
    height: 70,
    zIndex: 4,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#252b43',
    height: '30%',
    width: 4,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 4,
  },
  seconds: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#bd4c5e',
    height: '45%',
    width: 2,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 4,
  },
});
