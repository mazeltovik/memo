import { StyleSheet, Pressable, Animated, View } from 'react-native';
import { PropsWithChildren, SetStateAction, useRef } from 'react';
import useOnPressAnim from '../hooks/onPress';

type IntroButtonProps = {
  text: string;
  setShowIntro: React.Dispatch<SetStateAction<boolean>>;
  setShowWordList: React.Dispatch<SetStateAction<boolean>>;
};

type WordListBtnTypes = {
  text: string;
  setShowWordList: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSwipeList: React.Dispatch<React.SetStateAction<boolean>>;
  setStopTime: React.Dispatch<SetStateAction<boolean>>;
};

type SwipeBtn = {
  text: string;
};

export default function ButtonWrapper({ children }: PropsWithChildren) {
  return <View>{children}</View>;
}

export function IntroButton({
  text,
  setShowIntro,
  setShowWordList,
}: IntroButtonProps) {
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
      setShowIntro(false);
      setShowWordList(true);
    });
  };
  return (
    <Animated.View
      style={[
        wordTestBtnStyles.wrapper,
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
        style={wordTestBtnStyles.pressContainer}
      >
        <Animated.Text style={[wordTestBtnStyles.pressText]}>
          {text}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export function WordListBtn({
  text,
  setShowSwipeList,
  setShowWordList,
  setStopTime,
}: WordListBtnTypes) {
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
          setShowWordList(false);
          setShowSwipeList(true);
          setStopTime(true);
        }}
      >
        <Animated.Text style={[basicBtn.pressText]}>{text}</Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export function SwipeBtn({ text }: SwipeBtn) {
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
        }}
      >
        <Animated.Text style={[basicBtn.pressText]}>{text}</Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

const wordTestBtnStyles = StyleSheet.create({
  wrapper: {
    width: 150,
    height: 150,
  },
  pressContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    justifyContent: 'center',
    backgroundColor: '#252b43',
  },
  pressText: {
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
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
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
