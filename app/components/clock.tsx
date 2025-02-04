import { useEffect, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  useAnimatedValue,
  Animated,
} from 'react-native';

type ClockTypes = {
  windowWidth: number;
  windowHeight: number;
  finishedAnim: boolean;
  setFinishedAnim: React.Dispatch<React.SetStateAction<boolean>>;
  stop: boolean;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};
export default function Clock({
  windowWidth,
  windowHeight,
  finishedAnim,
  setFinishedAnim,
  stop,
  time,
  setTime,
}: ClockTypes) {
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
            toValue: { x: windowWidth / 2 - 70, y: -windowHeight / 2 + 64 },
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(({ finished }) => {
      setFinishedAnim(finished);
    });
  }, [scalesAnim, coords, hoursDegree, secondsDegree]);
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (finishedAnim && !stop) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => {
      if (finishedAnim && interval) {
        clearInterval(interval);
      }
    };
  }, [time, finishedAnim, stop]);
  return (
    <View style={[clockStyles.clockContainer, { width: windowWidth }]}>
      <Animated.View
        style={[
          clockStyles.animatedContainer,
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
        {!finishedAnim && (
          <Animated.View
            style={[
              clockStyles.clockArrow,
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
            <View style={clockStyles.hours}></View>
          </Animated.View>
        )}
        {!finishedAnim && (
          <Animated.View
            style={[
              clockStyles.clockArrow,
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
            <View style={clockStyles.seconds}></View>
          </Animated.View>
        )}
        {finishedAnim && <Text style={clockStyles.clockCounter}>{time}</Text>}
      </Animated.View>
    </View>
  );
}

const clockStyles = StyleSheet.create({
  clockContainer: {
    position: 'absolute',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6c25d',
  },
  animatedContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#f6c25d',
    backgroundColor: '#333a56',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockArrow: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#fbd499',
    height: '30%',
    width: 4,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 4,
  },
  seconds: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#a52b36',
    height: '45%',
    width: 2,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 4,
  },
  clockCounter: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    color: '#fbd499',
  },
});
