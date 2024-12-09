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
  TextInput,
  Button,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import useOnPressAnim from '../hooks/onPress';
import isNum from '../scripts/isNumber';

import LottieView from 'lottie-react-native';

type SlideProps = {
  windowWidth: number;
};

function CountTest({ windowWidth }: SlideProps) {
  const scalesAnim = useRef(new Animated.ValueXY({ x: 1, y: 1 })).current;
  return (
    <View
      style={[
        assessmentStyles.countTestContainer,
        {
          width: windowWidth,
        },
      ]}
    >
      <Text style={assessmentStyles.assessmentDiscriptionHeader}>
        Тест на счет.
      </Text>
      <Text
        style={assessmentStyles.assessmentDiscriptionInfo}
        android_hyphenationFrequency="full"
      >
        Засеките время, которое вам потребуется на то, чтобы сосчитать от 1 до
        120 вслух как можно быстрее.
      </Text>
      <Pressable
        onPress={() => {
          Animated.sequence([
            Animated.timing(scalesAnim, {
              toValue: { x: 0.9, y: 0.9 },
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scalesAnim, {
              toValue: { x: 1, y: 1 },
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }}
        style={[assessmentStyles.pressContainer]}
      >
        <Animated.Text
          style={[
            {
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 8,
              color: 'white',
              fontFamily: 'Nunito-Regular',
              textAlign: 'center',
              backgroundColor: '#252b43',
            },
            {
              transform: [{ scaleX: scalesAnim.x }, { scaleY: scalesAnim.y }],
            },
          ]}
        >
          Вперед!
        </Animated.Text>
      </Pressable>
    </View>
  );
}

function Clock() {
  const { scales, onPress } = useOnPressAnim();
  const [text, onChangeText] = useState('');
  const [stop, setStop] = useState(false);
  //
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
    if (finishedAnim && !stop) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => {
      if (finishedAnim && interval) {
        clearInterval(interval);
      }
    };
  }, [time, finishedAnim, stop]);
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
      <View
        style={{
          width: windowWidth,
          paddingLeft: 16,
          paddingRight: 16,
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{
            textAlign: 'center',
            borderRadius: 8,
            backgroundColor: '#252b43',
            color: 'white',
          }}
          onChangeText={onChangeText}
          value={text}
          placeholder="Введите время"
          placeholderTextColor={'white'}
        />
        <Pressable
          onPress={() => {
            onPress();
            isNum(text);
            setStop(!stop);
          }}
          style={[assessmentStyles.pressContainer]}
        >
          <Animated.Text
            style={[
              {
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 8,
                color: 'white',
                fontFamily: 'Nunito-Regular',
                textAlign: 'center',
                backgroundColor: '#252b43',
              },
              {
                transform: [{ scaleX: scales.x }, { scaleY: scales.y }],
              },
            ]}
          >
            Стоп.
          </Animated.Text>
        </Pressable>
      </View>
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
    color: 'white',
    fontFamily: 'Nunito-Bold',
  },
  assessmentDiscriptionInfo: {
    textAlign: 'justify',
    color: 'white',
    fontFamily: 'Nunito-Regular',
  },
  countTestContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    gap: 16,
  },
  pressContainer: {
    marginTop: 32,
    borderRadius: '10%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  animationContainer: {
    alignItems: 'flex-end',
  },
  lottieContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#1d2029',
  },
  clockContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2029',
  },
  animatedContainer: {
    position: 'absolute',
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
