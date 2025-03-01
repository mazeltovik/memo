import { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useAnimatedValue,
  Animated,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Paths } from 'expo-file-system/next';
import LottieView from 'lottie-react-native';
import ButtonWrapper, { ButtonContainer } from '../components/buttonWrapper';
import { localAnimations } from '../index';
import formatDuration from '../scripts/formatDuration';
import { Init } from '../scripts/filesystem/types';
import { getData, saveMainChallengeRes } from '../scripts/filesystem/fs';
enum Evaluation {
  gold = 120,
  silver = 180,
  bronze = 240,
}

// enum Evaluation {
//   gold = 10,
//   silver = 20,
//   bronze = 30,
// }

type Result = {
  operand1: number;
  operand2: number;
  operation: string;
  res: string;
};

type ResProps = {
  correct: number;
  totalChallenge: number;
  startTime: number;
  finishTime: number;
  results: Result[];
};

export default function ResView({
  correct,
  totalChallenge,
  startTime,
  finishTime,
  results,
}: ResProps) {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  const correctOpacity = useAnimatedValue(0);
  const correctTranslate = useAnimatedValue(-windowWidth);
  const timeOpacity = useAnimatedValue(0);
  const timeTranslate = useAnimatedValue(-windowWidth);
  const fineOpacity = useAnimatedValue(0);
  const fineTranslate = useAnimatedValue(-windowWidth);
  const [showMedal, setShowMedal] = useState(false);
  const { formatedTime, evaluation, fine } = useMemo(() => {
    const formatedTime = formatDuration(startTime, finishTime);
    const timeDiff = finishTime - startTime;
    const uncorrect = totalChallenge - correct;
    const fine = uncorrect > 0 ? 0.25 * uncorrect : 0;
    const totalTime = timeDiff + fine;
    const evaluation =
      uncorrect == totalChallenge
        ? ''
        : totalTime <= Evaluation.gold
        ? 'золото'
        : totalTime > Evaluation.gold && totalTime <= Evaluation.silver
        ? 'серебро'
        : totalTime > Evaluation.silver && totalTime <= Evaluation.bronze
        ? 'бронза'
        : 'новичок';
    return { formatedTime, evaluation, fine };
  }, []);
  useEffect(() => {
    try {
      let { currentDay } = getData<Init>(
        Paths.document,
        'memoData',
        'init.json'
      );
      saveMainChallengeRes(Paths.document, 'memoData', 'challenge.json', {
        currentDay,
        correct,
        totalChallenge,
        formatedTime,
        evaluation,
        fine,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    Animated.sequence([
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
      ]),
      Animated.parallel([
        Animated.timing(timeOpacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(timeTranslate, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fineOpacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(fineTranslate, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) setShowMedal(true);
    });
  }, [
    correctOpacity,
    correctTranslate,
    timeOpacity,
    timeTranslate,
    fineOpacity,
    fineTranslate,
  ]);
  const onClick = () => {
    router.dismissAll();
  };
  return (
    <View style={styles.resultWrapper}>
      <View style={styles.resultContainer}>
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
            <Text
              style={styles.infoText}
            >{`${correct} / ${totalChallenge}`}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.info,
              {
                opacity: timeOpacity,
              },
              {
                transform: [
                  {
                    translateX: timeTranslate,
                  },
                ],
              },
            ]}
          >
            <Text style={styles.infoText}>Время:</Text>
            <Text style={styles.infoText}>{formatedTime}</Text>
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
            <Text style={styles.infoText}>{`+ ${fine} сек`}</Text>
          </Animated.View>
          {showMedal && (
            <View style={styles.lottieWrapper}>
              <LottieView
                autoPlay={true}
                loop={false}
                source={
                  evaluation == 'золото'
                    ? localAnimations.goldMedal
                    : evaluation == 'серебро'
                    ? localAnimations.silverMedal
                    : evaluation == 'бронза'
                    ? localAnimations.bronzeMedal
                    : localAnimations.chill
                }
                style={styles.lottieContainer}
              />
              <Text style={styles.evaluationText}>
                {evaluation == 'золото'
                  ? 'Вычислительная машина'
                  : evaluation == 'серебро'
                  ? 'Вычислительный эксперт'
                  : evaluation == 'бронза'
                  ? 'Мастер вычислений'
                  : 'Новичок'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.testWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>тесты</Text>
            <View style={styles.titleUnderline}></View>
          </View>
          <ScrollView
            scrollEnabled={true}
            indicatorStyle="white"
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            style={styles.testsContainer}
          >
            {results.map((result, index) => {
              const { operand1, operand2, operation, res } = result;
              const resInput = Number(res);
              let calcRes = 0;
              let calc = true;
              if (resInput || resInput == 0) {
                if (operation == '+') {
                  calcRes = operand1 + operand2;
                  calc = calcRes == resInput ? true : false;
                } else if (operation == '-') {
                  calcRes = operand1 - operand2;
                  calc = calcRes == resInput ? true : false;
                } else if (operation == '*') {
                  calcRes = operand1 * operand2;
                  calc = calcRes == resInput ? true : false;
                } else {
                  calcRes = operand1 / operand2;
                  calc = calcRes == resInput ? true : false;
                }
              } else {
                calc = false;
              }
              return (
                <View
                  key={index}
                  style={[
                    styles.resultElem,
                    {
                      borderWidth: 3,
                      borderColor: calc ? '#cbc385' : '#a52b36',
                    },
                  ]}
                >
                  <Text
                    style={styles.resultText}
                  >{`${operand1} ${operation} ${operand2} = ${res}`}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <ButtonWrapper>
          <ButtonContainer text="меню" onClick={onClick} />
        </ButtonWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultWrapper: {
    flex: 1,
    paddingTop: 8,
  },
  resultContainer: {
    height: '90%',
    flex: 1,
    backgroundColor: '#333a56',
    borderRadius: 10,
    gap: 32,
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
  testWrapper: {
    flex: 1,
  },
  lottieWrapper: {
    width: '100%',
    gap: 8,
  },
  lottieContainer: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  evaluationText: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
  },
  testsContainer: {
    paddingHorizontal: 8,
  },
  resultElem: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#333a56',
  },
  resultText: {
    paddingTop: 8,
    paddingBottom: 8,
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  btnContainer: {
    justifyContent: 'flex-end',
  },
});
