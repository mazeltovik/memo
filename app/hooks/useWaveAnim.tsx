import { useRef, useState } from 'react';
import { Animated, useAnimatedValue } from 'react-native';

export default function useWaveAnim() {
  const [start, setStart] = useState(false);
  const scaleOuterWave = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleInnerWave = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacity = useAnimatedValue(1);
  const animatedWaves = Animated.loop(
    Animated.parallel([
      Animated.timing(scaleOuterWave, {
        toValue: { x: 1, y: 1 },
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleInnerWave, {
        toValue: { x: 1, y: 1 },
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
    ])
  );
  return {
    scaleInnerWave,
    scaleOuterWave,
    opacity,
    animatedWaves,
    start,
    setStart,
  };
}
