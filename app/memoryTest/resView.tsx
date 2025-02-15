import { useEffect, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  useAnimatedValue,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import ButtonWrapper, { ButtonContainer } from '../components/buttonWrapper';
import useCountUp from '../hooks/useCountUp';

type Props = {
  windowWidth: number;
  totalLen: number;
  score: { correct: number; percentage: number; fine: number };
  waves: any;
};

export default function ResView({
  windowWidth,
  totalLen,
  waves,
  score: { correct, percentage, fine },
}: Props) {
  const router = useRouter();
  const { count: correctCount, countUp: countUpCorrect } = useCountUp(correct);
  const { count: fineCount, countUp: countUpFine } = useCountUp(fine);
  const { count, countUp } = useCountUp(percentage, 4000);
  const correctOpacity = useAnimatedValue(0);
  const correctTranslate = useAnimatedValue(-windowWidth);
  const fineOpacity = useAnimatedValue(0);
  const fineTranslate = useAnimatedValue(-windowWidth);
  const translateY = useAnimatedValue(200);
  const scalesAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [showResult, setShowResult] = useState(false);
  const handleDismissAll = () => {
    router.dismissAll();
  };
  useEffect(() => {
    Animated.parallel([
      Animated.timing(correctOpacity, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(correctTranslate, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        countUpCorrect();
      }
    });
    Animated.parallel([
      Animated.timing(fineOpacity, {
        toValue: 1,
        duration: 3000,
        delay: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(fineTranslate, {
        toValue: 0,
        duration: 2000,
        delay: 5000,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        countUpFine();
      }
    });
    Animated.timing(scalesAnim, {
      toValue: { x: 1, y: 1 },
      duration: 2000,
      delay: 10000,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(true);
      countUp();
    });
    Animated.timing(translateY, {
      toValue: -40 + Math.round(200 * (fine / 100)),
      delay: 11000,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [correctOpacity, correctTranslate, translateY, scalesAnim]);
  return (
    <View style={styles.resContainer}>
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.info,
            {
              opacity: correctOpacity,
            },
            {
              transform: [
                {
                  translateX: correctTranslate,
                },
              ],
            },
          ]}
        >
          <Text style={styles.infoText}>Верно:</Text>
          <Text style={styles.infoText}>{`${correctCount}/${totalLen}`}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.info,
            {
              opacity: fineOpacity,
            },
            {
              transform: [
                {
                  translateX: fineTranslate,
                },
              ],
            },
          ]}
        >
          <Text style={styles.infoText}>Штраф:</Text>
          <Text style={styles.infoText}>{`- ${fineCount}%`}</Text>
        </Animated.View>
        <View style={styles.wavesWrapper}>
          <Text style={[styles.infoText, { textAlign: 'center' }]}>
            Оценка:
          </Text>
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
                source={waves}
                style={styles.lottieContainer}
              />
            </Animated.View>
          </Animated.View>
          {showResult && (
            <Text
              style={[styles.infoText, { textAlign: 'center' }]}
            >{`${count}%`}</Text>
          )}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <ButtonWrapper>
          <ButtonContainer text="меню" onClick={handleDismissAll} />
        </ButtonWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resContainer: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  animationContainer: {
    flex: 2,
    backgroundColor: '#333a56',
    gap: 32,
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textTransform: 'capitalize',
  },
  infoText: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  wavesWrapper: {
    justifyContent: 'center',
    gap: 32,
  },
  wavesContainer: {
    width: 200,
    height: 200,
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#fbd499',
    borderWidth: 5,
  },
  lottieContainer: {
    position: 'absolute',
    width: 230,
    height: 230,
    transform: [
      {
        scaleX: 1.5,
      },
    ],
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
