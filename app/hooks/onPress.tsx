import { useRef } from 'react';
import { Animated } from 'react-native';

export default function useOnPressAnim() {
  const scales = useRef(new Animated.ValueXY({ x: 1, y: 1 })).current;
  const onPress = () => {
    Animated.sequence([
      Animated.timing(scales, {
        toValue: { x: 0.9, y: 0.9 },
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scales, {
        toValue: { x: 1, y: 1 },
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return { scales, onPress };
}
