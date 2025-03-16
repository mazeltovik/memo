import { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  useAnimatedValue,
  BackHandler,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { Paths } from 'expo-file-system/next';
import MainModal from '../components/modalView';
import BackHandlerModal from '../components/modals/backHandlerModal';
import Clock from '../components/clock';
import ButtonWrapper, {
  ButtonContainer,
  StartBtn,
} from '../components/buttonWrapper';
import formatDuration from '../scripts/formatDuration';
import { getData, saveCountTestRes } from '../scripts/filesystem/fs';
import Progress from '../scripts/filesystem/types';
import { localAnimations } from '../index';
import fsConstants from '../scripts/filesystem/constants';

enum Evaluation {
  gold = 60,
  silver = 90,
  bronze = 120,
}

export default function CountTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const router = useRouter();
  const [start, setStart] = useState(false);
  const [finishedAnim, setFinishedAnim] = useState(false);
  const [stop, setStop] = useState(false);
  const [time, setTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [showMedal, setShowMedal] = useState(false);
  const [score, setScore] = useState({
    formatedTime: '',
    evaluation: '',
  });
  const timeOpacity = useAnimatedValue(0);
  const timeTranslate = useAnimatedValue(-windowWidth);
  const onStart = () => {
    setStart(true);
  };
  const onStop = () => {
    const formatedTime = formatDuration(0, time);
    const evaluation =
      time <= Evaluation.gold
        ? 'повелитель счета'
        : time > Evaluation.gold && time <= Evaluation.silver
        ? 'магистр счета'
        : time > Evaluation.silver && time <= Evaluation.bronze
        ? 'страж счета'
        : 'новичок';
    try {
      const { dirName, initFile, countTestFile } = fsConstants;
      const data = getData<Progress>(Paths.document, dirName, initFile);
      if (data) {
        const date = new Date().toString();
        const { currentDay } = data;
        saveCountTestRes(Paths.document, dirName, countTestFile, {
          date,
          time,
          formatedTime,
          evaluation,
          currentDay: String(currentDay),
        });
      }
    } catch (err) {
      console.error(err);
    }
    setScore({ formatedTime, evaluation });
    setStop(!stop);
  };
  const handleDismissAll = () => {
    router.dismissAll();
  };
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
    const animated = Animated.parallel([
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
    ]);
    if (stop) {
      animated.start(({ finished }) => {
        if (finished) {
          setShowMedal(true);
        }
      });
    }
  }, [stop]);
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
      {start && (
        <Clock
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          finishedAnim={finishedAnim}
          setFinishedAnim={setFinishedAnim}
          stop={stop}
          time={time}
          setTime={setTime}
        />
      )}
      {finishedAnim && !stop && (
        <ButtonWrapper>
          <ButtonContainer text="стоп" onClick={onStop} />
        </ButtonWrapper>
      )}
      {stop && (
        <View style={styles.resContainer}>
          <View style={styles.animatedContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleHeader}>оценка</Text>
              <View style={styles.titleUnderline}></View>
            </View>
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
              <Text style={styles.infoText}>{score.formatedTime}</Text>
            </Animated.View>
            {showMedal && (
              <View style={styles.lottieWrapper}>
                <LottieView
                  autoPlay={true}
                  loop={false}
                  source={
                    time <= Evaluation.gold
                      ? localAnimations.goldMedal
                      : time > Evaluation.gold && time <= Evaluation.silver
                      ? localAnimations.silverMedal
                      : time > Evaluation.silver && time <= Evaluation.bronze
                      ? localAnimations.bronzeMedal
                      : localAnimations.chill
                  }
                  style={styles.lottieContainer}
                />
                <Text style={styles.evaluationText}>{score.evaluation}</Text>
              </View>
            )}
          </View>
          <View style={styles.routeBtn}>
            <ButtonWrapper>
              <ButtonContainer text="меню" onClick={handleDismissAll} />
            </ButtonWrapper>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  startContainer: {
    alignSelf: 'center',
  },
  resContainer: {
    flex: 1,
    backgroundColor: '#1d2029',
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 16,
    gap: 32,
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
  animatedContainer: {
    flex: 2,
    backgroundColor: '#333a56',
    borderRadius: 10,
  },
  lottieWrapper: {
    width: '100%',
    padding: 8,
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
    textTransform: 'capitalize',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  infoText: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  routeBtn: {
    justifyContent: 'flex-end',
  },
});
