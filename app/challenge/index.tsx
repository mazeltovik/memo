import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useAnimatedValue,
  Animated,
  BackHandler,
} from 'react-native';
import LottieView from 'lottie-react-native';
import ButtonWrapper, {
  ButtonContainer,
  StartBtn,
} from '../components/buttonWrapper';
import ProgressBar from '../components/progressBar';
import ResView from './resView';
import MainModal from '../components/modalView';
import BackHandlerModal from '../components/modals/backHandlerModal';
import getRandomInt, { getRandomEvenInt } from '../scripts/getRandomInt';

enum ChallengeSettings {
  totalChallenge = 20,
  plusChallenge = 5,
  minusChallenge = 5,
  multiplyChallenge = 5,
  divideChallenge = 5,
}

type Operations = '_' | '+' | '-' | '*' | '/';

type Challenge = {
  operation: Operations;
  amount: number;
};

type Result = {
  operand1: number;
  operand2: number;
  operation: string;
  res: string;
};

export default function MainChallenge() {
  const translateY1 = useAnimatedValue(-55);
  const translateY2 = useAnimatedValue(-55);
  const opacity = useAnimatedValue(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [totalChallenge, setTotalChallenge] = useState(
    ChallengeSettings.totalChallenge
  );
  const [challenge, setChallenge] = useState({
    operand1: 0,
    operand2: 0,
    operation: '',
  });
  const [input, onChangeInput] = useState('');
  const [switchToRes, setSwitchToRes] = useState(false);
  const results = useRef<Result[]>([]);
  const challenges = useRef<Challenge[]>([
    { operation: '_', amount: 0 },
    { operation: '+', amount: ChallengeSettings.plusChallenge },
    { operation: '-', amount: ChallengeSettings.minusChallenge },
    { operation: '*', amount: ChallengeSettings.multiplyChallenge },
    { operation: '/', amount: ChallengeSettings.divideChallenge },
  ]);
  const totalTime = useRef({
    startTime: 0,
    finishTime: 0,
  }).current;
  const correct = useRef(0);
  const animated = Animated.parallel([
    Animated.timing(translateY1, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(translateY2, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }),
  ]);
  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    totalTime.startTime = Math.floor(Date.now() / 1000);
  }, []);
  useEffect(() => {
    if (totalChallenge > 0) {
      const availableChallenge = challenges.current
        .map((сhallenge, index) => {
          if (сhallenge.amount > 0) return index;
        })
        .filter((availableIndex) => availableIndex != undefined);
      const [min, max] =
        availableChallenge.length > 0
          ? [availableChallenge[0], availableChallenge.at(-1)]
          : [null, null];
      if (min && max) {
        const operationIndex = getRandomInt(min, max);
        const { operation } = challenges.current[operationIndex];
        if (operation == '+') {
          const operand1 = getRandomInt(2, 9);
          const operand2 = getRandomInt(4, 9);
          setChallenge({ operand1, operand2, operation });
          animated.start();
        } else if (operation == '-') {
          const operand1 = getRandomInt(9, 18);
          const operand2 = getRandomInt(8, 2);
          setChallenge({ operand1, operand2, operation });
          animated.start();
        } else if (operation == '*') {
          const operand1 = getRandomInt(2, 9);
          const operand2 = getRandomInt(4, 9);
          setChallenge({ operand1, operand2, operation });
          animated.start();
        } else {
          const [operand1, operand2] = getRandomEvenInt(10);
          setChallenge({ operand1, operand2, operation });
          animated.start();
        }
      }
    } else {
      totalTime.finishTime = Math.floor(Date.now() / 1000);
    }
  }, [translateY1, translateY2, opacity, totalChallenge]);
  const onClick = () => {
    if (input) {
      const { operand1, operand2, operation } = challenge;
      const resInput = Number(input);
      let calcRes = 0;
      if (resInput || resInput == 0) {
        if (operation == '+') {
          calcRes = operand1 + operand2;
          correct.current += calcRes == resInput ? 1 : 0;
        } else if (operation == '-') {
          calcRes = operand1 - operand2;
          correct.current += calcRes == resInput ? 1 : 0;
        } else if (operation == '*') {
          calcRes = operand1 * operand2;
          correct.current += calcRes == resInput ? 1 : 0;
        } else {
          calcRes = operand1 / operand2;
          correct.current += calcRes == resInput ? 1 : 0;
        }
        results.current.push({ operand1, operand2, operation, res: input });
        const currentChallenge = challenges.current.find(
          (challenge) => challenge.operation == operation
        );
        if (currentChallenge) {
          currentChallenge.amount -= 1;
          onChangeInput('');
          setStep(step + 1);
          setTotalChallenge(totalChallenge - 1);
          animated.reset();
        }
      }
    }
  };
  const onStart = () => {
    setStart(true);
  };
  const showRes = () => {
    setSwitchToRes(true);
  };
  return (
    <View style={styles.wrapper}>
      <MainModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <BackHandlerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </MainModal>
      {!start && (
        <View style={styles.startContainer}>
          <ButtonWrapper>
            <StartBtn text="старт" onClick={onStart} />
          </ButtonWrapper>
        </View>
      )}
      {!switchToRes && start && (
        <View style={styles.challengeContainer}>
          <ProgressBar
            step={step}
            steps={ChallengeSettings.totalChallenge}
            height={4}
          />
          {totalChallenge > 0 && (
            <View style={styles.challenge}>
              <View style={styles.operandContainer}>
                <Animated.Text
                  style={[
                    styles.textOperand,
                    {
                      transform: [
                        { translateY: translateY1 },
                        { perspective: 1000 },
                      ],
                    },
                    {
                      opacity: opacity,
                    },
                  ]}
                >
                  {challenge.operand1}
                </Animated.Text>
              </View>
              <View style={styles.operandContainer}>
                <Text style={styles.textOperand}>{challenge.operation}</Text>
              </View>
              <View style={styles.operandContainer}>
                <Animated.Text
                  style={[
                    styles.textOperand,
                    {
                      transform: [
                        { translateY: translateY2 },
                        { perspective: 1000 },
                      ],
                    },
                    {
                      opacity: opacity,
                    },
                  ]}
                >
                  {challenge.operand2}
                </Animated.Text>
              </View>
            </View>
          )}
          {!totalChallenge && (
            <View style={styles.lottieWrapper}>
              <LottieView
                autoPlay={true}
                loop={false}
                source={require('../../assets/animations/congratulations.json')}
                style={styles.lottieContainer}
              />
              <ButtonWrapper>
                <ButtonContainer text="результаты" onClick={showRes} />
              </ButtonWrapper>
            </View>
          )}
        </View>
      )}
      {start && totalChallenge > 0 && (
        <View style={styles.resContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeInput}
            value={input}
            placeholder="Введите результат"
            placeholderTextColor={'#fbd499'}
            keyboardType="numeric"
          />
          <ButtonWrapper>
            <ButtonContainer text="Далее" onClick={onClick} />
          </ButtonWrapper>
        </View>
      )}
      {switchToRes && (
        <ResView
          startTime={totalTime.startTime}
          finishTime={totalTime.finishTime}
          results={results.current}
          correct={correct.current}
          totalChallenge={ChallengeSettings.totalChallenge}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 32,
    backgroundColor: '#1d2029',
    // paddingLeft: 16,
    // paddingRight: 16,
    justifyContent: 'space-between',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  challengeContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  challenge: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
  },
  operandContainer: {
    justifyContent: 'center',
    backgroundColor: '#252b43',
    borderRadius: 8,
    height: 80,
    width: 80,
  },
  textOperand: {
    textAlign: 'center',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    fontSize: 32,
  },
  lottieWrapper: {
    width: '100%',
  },
  lottieContainer: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  resContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  textInput: {
    height: 48,
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: '#252b43',
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
});
