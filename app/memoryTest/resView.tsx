import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  useAnimatedValue,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import ButtonWrapper, { ButtonContainer } from '../components/buttonWrapper';
import TabMenu from '../components/tabMenu';
import useCountUp from '../hooks/useCountUp';

type Props = {
  windowWidth: number;
  totalLen: number;
  score: { correct: number; percentage: number };
  waves: any;
  initialWords: string[];
  approvedWords: string[];
  shuffleWrongWords: string[];
};

export default function ResView({
  windowWidth,
  totalLen,
  waves,
  score: { correct, percentage },
  initialWords,
  approvedWords,
  shuffleWrongWords,
}: Props) {
  const router = useRouter();
  const [showResult, setShowResult] = useState(false);
  const { count: correctCount, countUp: countUpCorrect } = useCountUp(correct);
  const { count, countUp } = useCountUp(percentage, 4000);
  const correctOpacity = useAnimatedValue(0);
  const correctTranslate = useAnimatedValue(-windowWidth);
  const translateY = useAnimatedValue(70);
  const scalesAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const wordsList = useRef<Animated.ScrollView>(null);
  const onPressItem = useCallback((itemIndex: number) => {
    wordsList?.current?.scrollTo({
      x: itemIndex * windowWidth,
      animated: true,
    });
  }, []);
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
    Animated.timing(scalesAnim, {
      toValue: { x: 1, y: 1 },
      duration: 1000,
      delay: 5000,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(true);
      countUp();
    });
    Animated.timing(translateY, {
      toValue:
        percentage == 100
          ? -35
          : percentage == 0
          ? 70
          : 70 + (-35 - 70) * (percentage / 100),
      delay: 6000,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [correctOpacity, correctTranslate, translateY, scalesAnim]);
  return (
    <View style={styles.resContainer}>
      <View style={styles.animationContainer}>
        <View style={styles.score}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>оценка</Text>
            <View style={styles.titleUnderline}></View>
          </View>
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
          <View style={styles.wavesWrapper}>
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
                style={[{ width: '100%' }, { transform: [{ translateY }] }]}
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
        <View style={styles.wordListContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>слова</Text>
            <View style={styles.titleUnderline}></View>
          </View>
          <TabMenu
            tabs={[
              `исходные (${initialWords.length})`,
              `добавочные (${shuffleWrongWords.length})`,
            ]}
            translateX={translateX}
            onPressItem={onPressItem}
          />
          <Animated.ScrollView
            ref={wordsList}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            scrollEnabled={false}
          >
            <ScrollView
              scrollEnabled={true}
              indicatorStyle="white"
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              style={{
                width: windowWidth - 32,
                padding: 8,
              }}
            >
              {initialWords.map((word, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginTop: 16,
                      marginBottom: 16,
                      width: '100%',
                      borderRadius: 10,
                      height: 50,
                      justifyContent: 'center',
                      backgroundColor: '#333a56',
                      borderWidth: 3,
                      borderColor: approvedWords.includes(word)
                        ? '#cbc385'
                        : '#a52b36',
                    }}
                  >
                    <Text
                      style={{
                        paddingTop: 8,
                        paddingBottom: 8,
                        color: '#fbd499',
                        fontFamily: 'Poiret-One',
                        fontWeight: 'regular',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                    >
                      {word}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <ScrollView
              scrollEnabled={true}
              indicatorStyle="white"
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              style={{ width: windowWidth - 32, padding: 8 }}
            >
              {shuffleWrongWords.map((word, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginTop: 16,
                      marginBottom: 16,
                      width: '100%',
                      borderRadius: 10,
                      height: 50,
                      justifyContent: 'center',
                      backgroundColor: '#333a56',
                      borderWidth: 3,
                      borderColor: '#cbc385',
                    }}
                  >
                    <Text
                      style={{
                        paddingTop: 8,
                        paddingBottom: 8,
                        color: '#fbd499',
                        fontFamily: 'Poiret-One',
                        fontWeight: 'regular',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                    >
                      {word}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </Animated.ScrollView>
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
    paddingTop: 8,
  },
  animationContainer: {
    flex: 1,
    height: '90%',
    backgroundColor: '#333a56',
    borderRadius: 10,
  },
  score: {
    flex: 1,
  },
  titleContainer: {
    padding: 8,
  },
  titleHeader: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  titleUnderline: {
    borderColor: '#fbd499',
    borderBottomColor: '#fbd499',
    borderBottomWidth: 2,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  wavesContainer: {
    width: 100,
    height: 100,
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#fbd499',
    borderWidth: 4,
  },
  lottieContainer: {
    position: 'absolute',
    width: 130,
    height: 130,
    transform: [
      {
        scaleX: 1.5,
      },
    ],
  },
  wordListContainer: {
    flex: 2,
  },
  btnContainer: {
    justifyContent: 'flex-end',
  },
});
