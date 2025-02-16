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
import MainModal from '../components/modalView';
import BackHandlerModal from '../components/modals/backHandlerModal';
import Clock from '../components/clock';
import ButtonWrapper, {
  ButtonContainer,
  StartBtn,
} from '../components/buttonWrapper';
import formatDuration from '../scripts/formatDuration';
import { localAnimations } from '../index';

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
  const timeOpacity = useAnimatedValue(0);
  const timeTranslate = useAnimatedValue(-windowWidth);
  const [showMedal, setShowMedal] = useState(false);
  const onStart = () => {
    setStart(true);
  };
  const onStop = () => {
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
              <Text style={styles.infoText}>{formatDuration(0, time)}</Text>
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
                <Text style={styles.evaluationText}>
                  {time <= Evaluation.gold
                    ? 'повелитель счета'
                    : time > Evaluation.gold && time <= Evaluation.silver
                    ? 'магистр счета'
                    : time > Evaluation.silver && time <= Evaluation.bronze
                    ? 'страж счета'
                    : 'новичок'}
                </Text>
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
  animatedContainer: {
    flex: 2,
    backgroundColor: '#333a56',
    borderRadius: 10,
    justifyContent: 'space-between',
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
    textTransform: 'capitalize',
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  routeBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
