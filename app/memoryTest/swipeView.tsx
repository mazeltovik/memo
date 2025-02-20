import { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useAnimatedValue,
  PanResponder,
  Text,
} from 'react-native';
import LottieView from 'lottie-react-native';
import ButtonWrapper, { ButtonContainer } from '../components/buttonWrapper';
import ProgressBar from '../components/progressBar';
import getMemoryScore from '../scripts/getMemoryScore';

type SwipeListProps = {
  windowHeight: number;
  words: string[];
  activeWord: string;
  shuffleInitialWords: string[];
  approvedWords: string[];
  totalSteps: number;
  setWords: React.Dispatch<React.SetStateAction<string[]>>;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSwipeView: React.Dispatch<React.SetStateAction<boolean>>;
  setApprovedWords: React.Dispatch<React.SetStateAction<string[]>>;
  setScore: React.Dispatch<
    React.SetStateAction<{ correct: number; percentage: number }>
  >;
};

export default function SwipeView({
  windowHeight,
  words,
  activeWord,
  shuffleInitialWords,
  approvedWords,
  totalSteps,
  setWords,
  setShowResult,
  setShowSwipeView,
  setApprovedWords,
  setScore,
}: SwipeListProps) {
  const [step, setStep] = useState(0);
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;
  const opacity = useAnimatedValue(0);
  useEffect(() => {
    const animatedOpacity = Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    if (words.length > 0) {
      animatedOpacity.start();
    }
    return () => {
      swipe.setValue({ x: 0, y: 0 });
      animatedOpacity.reset();
    };
  }, [words]);
  const removeTopCard = useCallback(() => {
    setWords((prevState) => {
      return prevState.slice(1);
    });
  }, [words]);
  const onClick = () => {
    console.log(approvedWords);
    const { correct, percentage } = getMemoryScore(
      shuffleInitialWords,
      approvedWords
    );
    setScore({ correct, percentage });
    setShowSwipeView(false);
    setShowResult(true);
  };
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (windowHeight * 0.9) / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const diraction = Math.sign(dx);
      const isSwipedOffScreen = Math.abs(dx) > 100;
      if (isSwipedOffScreen) {
        Animated.timing(swipe, {
          duration: 300,
          toValue: {
            x: diraction * 800,
            y: dy,
          },
          useNativeDriver: true,
        }).start(() => {
          if (~diraction) {
            setApprovedWords((prevState) => {
              return [...prevState, activeWord];
            });
          }
          setStep(step + 1);
          removeTopCard();
        });
        return;
      }
      Animated.spring(swipe, {
        toValue: {
          x: 0,
          y: 0,
        },
        useNativeDriver: true,
        friction: 5,
      }).start();
    },
  });
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['8deg', '0deg', '-8deg'],
  });
  const yesOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.wrapper}>
      <ProgressBar step={step} steps={totalSteps} height={4} />
      {words.length == 0 ? (
        <View
          style={{ ...styles.lottieWrapper, marginTop: windowHeight * 0.4 }}
        >
          <LottieView
            autoPlay={true}
            loop={false}
            source={require('../../assets/animations/congratulations.json')}
            style={styles.lottieContainer}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Animated.View
            style={[
              { ...styles.swipeContainer, opacity, height: windowHeight * 0.5 },
              {
                transform: [...swipe.getTranslateTransform(), { rotate }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View
              style={{
                ...styles.textContainer,
              }}
            >
              <Animated.Text style={[styles.yesText, { opacity: yesOpacity }]}>
                было
              </Animated.Text>
              <Animated.Text
                style={[styles.nopeText, { opacity: nopeOpacity }]}
              >
                не было
              </Animated.Text>
            </View>
            <Animated.View
              style={[
                { ...styles.borderContainer, borderColor: '#f6c25d' },
                {
                  height: windowHeight * 0.5,
                  opacity: yesOpacity,
                },
              ]}
            />
            <Animated.View
              style={[
                { ...styles.borderContainer, borderColor: '#a52b36' },
                {
                  height: windowHeight * 0.5,
                  opacity: nopeOpacity,
                },
              ]}
            />
            <Text style={styles.text}>{activeWord}</Text>
          </Animated.View>
        </View>
      )}
      {words.length == 0 && (
        <ButtonWrapper>
          <ButtonContainer text="результаты" onClick={onClick} />
        </ButtonWrapper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    // justifyContent: 'space-between',
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  lottieWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    width: 80,
    height: 80,
  },
  swipeContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 3,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#252b43',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fbd499',
    textTransform: 'capitalize',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  borderContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    borderWidth: 5,
    borderRadius: 10,
  },
  yesText: {
    position: 'absolute',
    fontSize: 15,
    textAlign: 'center',
    color: '#f6c25d',
    textTransform: 'capitalize',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  nopeText: {
    position: 'absolute',
    fontSize: 15,
    textAlign: 'center',
    color: '#a52b36',
    textTransform: 'capitalize',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
});
