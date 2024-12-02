import { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  useAnimatedValue,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import LottieView from 'lottie-react-native';

type SlideProps = {
  windowWidth: number;
};

function AssessmentDiscriptionSlide({ windowWidth }: SlideProps) {
  return (
    <View style={assessmentStyles.assessmentDiscriptionWrapper}>
      <View
        style={[
          assessmentStyles.assessmentDiscriptionContainer,
          { width: windowWidth },
        ]}
      >
        <Text
          style={assessmentStyles.assessmentDiscriptionHeader}
          android_hyphenationFrequency="full"
        >
          Предварительная оценка работы префронтальной коры.
        </Text>
        <Text
          style={assessmentStyles.assessmentDiscriptionInfo}
          android_hyphenationFrequency="full"
        >
          Пожалуйста, оцените работу вашей префронтальной коры головного мозга
          перед тем, как приступить к основным тренировкам.
        </Text>
      </View>
      <View style={assessmentStyles.animationContainer}>
        <LottieView
          autoPlay
          style={[assessmentStyles.lottieContainer]}
          source={require('../../assets/animations/swipeHand.json')}
        />
      </View>
    </View>
  );
}

function CountTest({ windowWidth }: SlideProps) {
  return (
    <View
      style={{
        width: windowWidth,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <Text style={{ textAlign: 'center' }}>Тест на счет.</Text>
      <Text
        style={{ textAlign: 'justify' }}
        android_hyphenationFrequency="full"
      >
        Засеките время, которое вам потребуется на то, чтобы сосчитать от 1 до
        120 вслух как можно быстрее.
      </Text>
      <Pressable
        style={{
          marginTop: 32,
          backgroundColor: '#F194FF',
          borderRadius: 4,
          padding: 8,
        }}
      >
        <Text style={{ textAlign: 'center' }}>Вперед!</Text>
      </Pressable>
    </View>
  );
}

function Clock() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const coords = useRef(new Animated.ValueXY()).current;
  const scalesAnim = useRef(new Animated.ValueXY()).current;
  const hoursDegree = useAnimatedValue(180);
  const secondsDegree = useAnimatedValue(225);
  const [finishedAnim, setFinishedAnim] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    Animated.parallel([
      Animated.parallel([
        Animated.timing(hoursDegree, {
          toValue: 540,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(secondsDegree, {
          toValue: 540,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scalesAnim, {
            toValue: { x: 1.5, y: 1.5 },
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scalesAnim, {
            toValue: { x: 1, y: 1 },
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(coords, {
            toValue: { x: windowWidth / 2 - 54, y: -windowHeight / 2 + 96 },
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(({ finished }) => {
      setFinishedAnim(finished);
    });
  }, [scalesAnim, coords, hoursDegree, secondsDegree]);
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (finishedAnim) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => {
      if (finishedAnim && interval) {
        clearInterval(interval);
      }
    };
  }, [time, finishedAnim]);
  return (
    <View style={[assessmentStyles.clockContainer, { width: windowWidth }]}>
      <Animated.View
        style={[
          assessmentStyles.animatedContainer,
          {
            transform: [
              { scaleX: scalesAnim.x },
              { scaleY: scalesAnim.y },
              {
                translateX: coords.x,
              },
              {
                translateY: coords.y,
              },
              { perspective: 1000 },
            ],
          },
        ]}
      >
        {!finishedAnim && (
          <Animated.View
            style={[
              assessmentStyles.clockArrow,
              {
                transform: [
                  {
                    rotate: hoursDegree.interpolate({
                      inputRange: [180, 540],
                      outputRange: ['180deg', '540deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={assessmentStyles.hours}></View>
          </Animated.View>
        )}
        {!finishedAnim && (
          <Animated.View
            style={[
              assessmentStyles.clockArrow,
              {
                transform: [
                  {
                    rotate: secondsDegree.interpolate({
                      inputRange: [225, 540],
                      outputRange: ['225deg', '540deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={assessmentStyles.seconds}></View>
          </Animated.View>
        )}
        {finishedAnim && (
          <Text style={assessmentStyles.clockCounter}>{time}</Text>
        )}
      </Animated.View>
    </View>
  );
}

export default function PreliminaryAssessment() {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View style={assessmentStyles.mainContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        <Clock />
      </ScrollView>
    </View>
  );
}

const assessmentStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  assessmentDiscriptionWrapper: {
    justifyContent: 'space-between',
  },
  assessmentDiscriptionContainer: {
    gap: 16,
    flexGrow: 0.5,
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
  },
  assessmentDiscriptionHeader: {
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
  assessmentDiscriptionInfo: {
    textAlign: 'justify',
    fontFamily: 'Nunito-Regular',
  },
  animationContainer: {
    alignItems: 'flex-end',
  },
  lottieContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#c9ccf0',
  },
  clockContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2029',
  },
  animatedContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#495278',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockArrow: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hours: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#252b43',
    height: '30%',
    width: 4,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 4,
  },
  seconds: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#bd4c5e',
    height: '45%',
    width: 2,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 4,
  },
  clockCounter: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
});
