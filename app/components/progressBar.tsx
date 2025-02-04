import { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

type ProgressBar = {
  step: number;
  steps: number;
  height: number;
};

export default function ProgressBar({ step, steps, height }: ProgressBar) {
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const [width, setWidth] = useState(0);
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width]);
  return (
    <View
      onLayout={(event) => {
        const newWidth = event.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        height,
        backgroundColor: '#879c7d',
        borderRadius: height,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          height,
          width: '100%',
          borderRadius: height,
          backgroundColor: '#f6c25d',
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      />
    </View>
  );
}
