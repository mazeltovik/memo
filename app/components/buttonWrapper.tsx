import {
  StyleSheet,
  Pressable,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';
import { PropsWithChildren, useRef } from 'react';

type BtnContainer = {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  color?: string;
};

export default function ButtonWrapper({ children }: PropsWithChildren) {
  return <View>{children}</View>;
}

export function ButtonContainer({
  text,
  onClick,
  backgroundColor,
  color,
}: BtnContainer) {
  return (
    <TouchableOpacity
      style={[
        basicBtn.pressContainer,
        {
          backgroundColor: backgroundColor ? backgroundColor : '#333a56',
        },
      ]}
      onPress={() => {
        onClick();
      }}
    >
      <View>
        <Animated.Text
          style={[basicBtn.pressText, { color: color ? color : '#fbd499' }]}
        >
          {text}
        </Animated.Text>
      </View>
    </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressText: {
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
