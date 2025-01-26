import { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useAnimatedValue,
  Animated,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import formatDuration from '../scripts/formatDuration';
import ButtonWrapper, {
  CalcChallengeBtn,
  ButtonContainer,
} from '../components/buttonWrapper';
import { Result, Evaluation } from '../challenges/mainChallenge';

type ResProps = {
  correct: number;
  totalChallenge: number;
  startTime: number;
  finishTime: number;
  results: Result[];
};

export default function MainChallengeRes({
  correct,
  totalChallenge,
  startTime,
  finishTime,
  results,
}: ResProps) {
  const { width: windowWidth } = useWindowDimensions();
  const opacity1 = useAnimatedValue(0);
  const translate1X = useAnimatedValue(-windowWidth);
  const opacity2 = useAnimatedValue(0);
  const translate2X = useAnimatedValue(-windowWidth);
  const [showMedal, setShowMedal] = useState(false);
  const { formatedTime, evaluation } = useMemo(() => {
    const formatedTime = formatDuration(startTime, finishTime);
    const timeDiff = finishTime - startTime;
    const evaluation =
      timeDiff <= Evaluation.gold
        ? 'gold'
        : timeDiff > Evaluation.gold && timeDiff <= Evaluation.silver
        ? 'silver'
        : 'bronze';
    console.log(evaluation);
    return { formatedTime, evaluation };
  }, []);
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(translate1X, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(translate2X, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [opacity1, translate1X, opacity2, translate2X]);
  const onClick = () => {};
  return (
    <View style={styles.resultWrapper}>
      <View style={styles.resultContainer}>
        <Animated.View
          style={[
            styles.info,
            {
              opacity: opacity1,
            },
            {
              transform: [
                {
                  translateX: translate1X,
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
              opacity: opacity2,
            },
            {
              transform: [
                {
                  translateX: translate2X,
                },
              ],
            },
          ]}
        >
          <Text style={styles.infoText}>Время:</Text>
          <Text style={styles.infoText}>{formatedTime}</Text>
        </Animated.View>
      </View>
      <ScrollView style={styles.testsContainer}>
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
                  borderWidth: 5,
                  borderColor: calc ? '#044203' : '#420803',
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
      <ButtonWrapper>
        <CalcChallengeBtn text="главное меню" onClick={onClick} />
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  resultWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  resultContainer: {
    flex: 0.5,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#333a56',
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textTransform: 'capitalize',
  },
  infoText: {
    color: 'white',
    fontFamily: 'Nunito-Regular',
  },
  testsContainer: {
    flex: 0.5,
  },
  testsBtnContainer: {
    // alignSelf: 'baseline',
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
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
