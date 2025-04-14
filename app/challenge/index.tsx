import { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  useAnimatedValue,
  Animated,
  BackHandler,
} from 'react-native';
import { Paths } from 'expo-file-system/next';
import LottieView from 'lottie-react-native';
import ButtonWrapper, {
  ButtonContainer,
  StartBtn,
} from '../components/buttonWrapper';
import ProgressBar from '../components/progressBar';
import ResView from './resView';
import MainModal from '../components/modalView';
import BackHandlerModal from '../components/modals/backHandlerModal';
import ChallengeLearningModal from '../components/modals/challengeLearningModal';
import createTasks from '../scripts/createTasks';
import formatDuration from '../scripts/formatDuration';
import Progress from '../scripts/filesystem/types';
import {
  getData,
  saveMainChallengeRes,
  saveSimpleData,
} from '../scripts/filesystem/fs';
import getNextDate from '../scripts/getNextDate';
import getDiffDate from '../scripts/getDiffDate';
import fsConstants from '../scripts/filesystem/constants';
import { ModalsData } from '../scripts/filesystem/types';

enum Evaluation {
  gold = 182,
  silver = 212,
  bronze = 242,
}

enum ChallengeSettings {
  totalChallenge = 100,
  plusChallenge = 30,
  minusChallenge = 30,
  multiplyChallenge = 30,
  divideChallenge = 10,
  gold = 100,
  silverMedal = 70,
  bronzeMedal = 30,
}

type Operation = {
  operand1: number;
  operand2: number;
  operation: string;
};

type Result = {
  operand1: number;
  operand2: number;
  operation: string;
  res: string;
};

export default function MainChallenge() {
  /animations/;
  const translateY1 = useAnimatedValue(-55);
  const translateY2 = useAnimatedValue(-55);
  const opacity = useAnimatedValue(0);

  /state/;
  const [modalVisible, setModalVisible] = useState(false);
  const [learningModalVisible, setLearningModalVisible] = useState(false);
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

  /refs/;
  const results = useRef<Result[]>([]);
  const challenges = useRef<Operation[]>([]);
  useMemo(() => {
    const tasksPartOne = createTasks();
    const tasksPartTwo = createTasks();
    challenges.current = [...tasksPartOne, ...tasksPartTwo];
  }, []);

  const settings = useRef({
    startTime: 0,
    finishTime: 0,
    correct: 0,
    formatedTime: '',
    fine: 0,
    evaluation: '',
  }).current;
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
    try {
      const { dirName, modalsFile } = fsConstants;
      const data = getData<ModalsData>(Paths.document, dirName, modalsFile);
      if (data) {
        const { isChallengeShow } = data;
        if (!isChallengeShow) setLearningModalVisible(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    const animated = Animated.parallel([
      Animated.timing(translateY1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY2, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
    if (totalChallenge > 0) {
      const { operand1, operand2, operation } =
        challenges.current.shift() as Operation;
      setChallenge({ operand1, operand2, operation });
      animated.start();
    } else {
      settings.finishTime = Math.floor(Date.now() / 1000);
      settings.formatedTime = formatDuration(
        settings.startTime,
        settings.finishTime
      );
      const timeDiff = settings.finishTime - settings.startTime;
      const uncorrect = ChallengeSettings.totalChallenge - settings.correct;
      settings.fine = uncorrect > 0 ? 0.25 * uncorrect : 0;
      const totalTime = timeDiff + settings.fine;
      const success =
        (settings.correct / ChallengeSettings.totalChallenge) * 100;
      settings.evaluation =
        totalTime <= Evaluation.gold && success == ChallengeSettings.gold
          ? 'золото'
          : totalTime > Evaluation.gold &&
            totalTime <= Evaluation.silver &&
            success >= ChallengeSettings.silverMedal
          ? 'серебро'
          : totalTime > Evaluation.silver &&
            totalTime <= Evaluation.bronze &&
            success >= ChallengeSettings.bronzeMedal
          ? 'бронза'
          : 'новичок';
      const { dirName, initFile, challengeFile } = fsConstants;
      try {
        const { correct, formatedTime, evaluation, fine } = settings;
        const data = getData<Progress>(Paths.document, dirName, initFile);
        if (!data) {
          const start = new Date().toString();
          const finish = getNextDate(start, 60);
          const checkDay = getNextDate(start, 5);
          const currentDay = 1;
          saveSimpleData(Paths.document, dirName, initFile, {
            start,
            finish,
            checkDay,
            currentDay,
            visitedDay: start,
          });

          saveMainChallengeRes(Paths.document, dirName, challengeFile, {
            date: start,
            currentDay: String(currentDay),
            correct,
            totalChallenge: ChallengeSettings.totalChallenge,
            formatedTime,
            evaluation,
            fine,
          });
        } else {
          const nowDate = new Date().toString();
          const { start, checkDay, finish, currentDay, visitedDay } = data;
          const diffDays = getDiffDate(visitedDay, nowDate);
          if (diffDays) {
            const newCurrentDay = currentDay + diffDays;
            const newCheckDay =
              newCurrentDay % 5 == 0 ? getNextDate(checkDay, 5) : checkDay;
            saveSimpleData(Paths.document, dirName, initFile, {
              start,
              finish,
              currentDay: newCurrentDay,
              visitedDay: nowDate,
              checkDay: newCheckDay,
            });
          }
          saveMainChallengeRes(Paths.document, dirName, challengeFile, {
            date: nowDate,
            currentDay: String(currentDay),
            correct,
            totalChallenge: ChallengeSettings.totalChallenge,
            formatedTime,
            evaluation,
            fine,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    return () => {
      animated.reset();
    };
  }, [translateY1, translateY2, opacity, totalChallenge]);
  const onClick = () => {
    if (input) {
      const { operand1, operand2, operation } = challenge;
      const resInput = Number(input);
      let calcRes = 0;
      if (resInput || resInput == 0) {
        if (operation == '+') {
          calcRes = operand1 + operand2;
          settings.correct += calcRes == resInput ? 1 : 0;
        } else if (operation == '-') {
          calcRes = operand1 - operand2;
          settings.correct += calcRes == resInput ? 1 : 0;
        } else if (operation == '*') {
          calcRes = operand1 * operand2;
          settings.correct += calcRes == resInput ? 1 : 0;
        } else {
          calcRes = operand1 / operand2;
          settings.correct += calcRes == resInput ? 1 : 0;
        }
        results.current.push({ operand1, operand2, operation, res: input });
        onChangeInput('');
        setStep(step + 1);
        setTotalChallenge(totalChallenge - 1);
      }
    }
  };
  const onStart = () => {
    settings.startTime = Math.floor(Date.now() / 1000);
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
      <MainModal
        modalVisible={learningModalVisible}
        setModalVisible={setLearningModalVisible}
      >
        <ChallengeLearningModal
          modalVisible={learningModalVisible}
          setModalVisible={setLearningModalVisible}
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
          results={results.current}
          correct={settings.correct}
          totalChallenge={ChallengeSettings.totalChallenge}
          formatedTime={settings.formatedTime}
          fine={settings.fine}
          evaluation={settings.evaluation}
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
    paddingHorizontal: 16,
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
