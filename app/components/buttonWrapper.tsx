import { StyleSheet, Pressable, Animated, View } from 'react-native';
import { PropsWithChildren, useRef } from 'react';
import useOnPressAnim from '../hooks/onPress';

type BtnContainer = {
  text: string;
  onClick: () => void;
};

export default function ButtonWrapper({ children }: PropsWithChildren) {
  return <View>{children}</View>;
}

export function ButtonContainer({ text, onClick }: BtnContainer) {
  const { scales, onPress } = useOnPressAnim();
  return (
    <Animated.View
      style={[
        basicBtn.pressContainer,
        {
          transform: [
            { scaleX: scales.x },
            { scaleY: scales.y },
            { perspective: 1000 },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => {
          onPress();
          onClick();
        }}
      >
        <Animated.Text style={[basicBtn.pressText]}>{text}</Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export function StartBtn({ text, onClick }: BtnContainer) {
  const scales = useRef(new Animated.ValueXY({ x: 1, y: 1 })).current;
  const onPress = () => {
    Animated.sequence([
      Animated.spring(scales, {
        toValue: { x: 1.2, y: 1.2 },
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(scales, {
        toValue: { x: 0, y: 0 },
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClick();
    });
  };
  return (
    <Animated.View
      style={[
        startBtnStyles.wrapper,
        {
          transform: [
            { scaleX: scales.x },
            { scaleY: scales.y },
            { perspective: 1000 },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => {
          onPress();
        }}
        style={startBtnStyles.pressContainer}
      >
        <Animated.Text style={[startBtnStyles.pressText]}>{text}</Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

const startBtnStyles = StyleSheet.create({
  wrapper: {
    width: 100,
    height: 100,
  },
  pressContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    justifyContent: 'center',
    backgroundColor: '#252b43',
  },
  pressText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
});

const basicBtn = StyleSheet.create({
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
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
