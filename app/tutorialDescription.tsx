import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';
import useOnPressAnim from './hooks/onPress';

type SlideProps = {
  windowWidth: number;
};

function TutorialIntro({ windowWidth }: SlideProps) {
  return (
    <View style={tutorialStyles.tutorialWrapper}>
      <View style={[tutorialStyles.tutorialContainer, { width: windowWidth }]}>
        <Text
          style={tutorialStyles.tutorialHeader}
          android_hyphenationFrequency="full"
        >
          Предварительная оценка работы префронтальной коры.
        </Text>
        <Text
          style={tutorialStyles.tutorialInfo}
          android_hyphenationFrequency="full"
        >
          Пожалуйста, оцените работу вашей префронтальной коры головного мозга
          перед тем, как приступить к основным тренировкам.
        </Text>
      </View>
      <View style={tutorialStyles.animationContainer}>
        <LottieView
          autoPlay
          style={[tutorialStyles.lottieContainer]}
          source={require('../assets/animations/swipeHand.json')}
        />
      </View>
    </View>
  );
}

function TutorialCountTest({ windowWidth }: SlideProps) {
  const { scales, onPress } = useOnPressAnim();
  return (
    <View style={tutorialStyles.tutorialWrapper}>
      <View style={[tutorialStyles.tutorialContainer, { width: windowWidth }]}>
        <Text
          style={tutorialStyles.tutorialHeader}
          android_hyphenationFrequency="full"
        >
          №1 Тест на счет.
        </Text>
        <Text
          style={tutorialStyles.tutorialInfo}
          android_hyphenationFrequency="full"
        >
          Вам необходимо засечь время, которое потребуется на то, чтобы
          сосчитать от 1 до 120 вслух как можно быстрее.
        </Text>
        <Pressable onPress={onPress} style={[tutorialStyles.pressContainer]}>
          <Animated.Text
            style={[
              tutorialStyles.pressText,
              {
                transform: [{ scaleX: scales.x }, { scaleY: scales.y }],
              },
            ]}
          >
            Приступить
          </Animated.Text>
        </Pressable>
      </View>
      <View style={tutorialStyles.animationContainer}>
        <LottieView
          autoPlay
          style={[tutorialStyles.lottieContainer]}
          source={require('../assets/animations/swipeHand.json')}
        />
      </View>
    </View>
  );
}

function TutorialWordTest({ windowWidth }: SlideProps) {
  const { scales, onPress } = useOnPressAnim();
  return (
    <View style={tutorialStyles.tutorialWrapper}>
      <View style={[tutorialStyles.tutorialContainer, { width: windowWidth }]}>
        <Text
          style={tutorialStyles.tutorialHeader}
          android_hyphenationFrequency="full"
        >
          №2 Тест на запоминание слов.
        </Text>
        <Text
          style={tutorialStyles.tutorialInfo}
          android_hyphenationFrequency="full"
        >
          Запомните столько слов за две минуты, сколько сможете.
        </Text>
        <Pressable onPress={onPress} style={[tutorialStyles.pressContainer]}>
          <Animated.Text
            style={[
              tutorialStyles.pressText,
              {
                transform: [{ scaleX: scales.x }, { scaleY: scales.y }],
              },
            ]}
          >
            Приступить
          </Animated.Text>
        </Pressable>
      </View>
      <View style={tutorialStyles.lastAnimationContainer}>
        <LottieView
          autoPlay
          style={[tutorialStyles.lottieContainer]}
          source={require('../assets/animations/swipeHand.json')}
        />
      </View>
    </View>
  );
}

export default function TutorialDescription() {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View style={tutorialStyles.mainContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        <TutorialIntro windowWidth={windowWidth} />
        <TutorialCountTest windowWidth={windowWidth} />
        <TutorialWordTest windowWidth={windowWidth} />
      </ScrollView>
    </View>
  );
}

const tutorialStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  tutorialWrapper: {
    justifyContent: 'space-between',
  },
  tutorialContainer: {
    gap: 16,
    flexGrow: 0.5,
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
  },
  tutorialHeader: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Nunito-Bold',
  },
  tutorialInfo: {
    textAlign: 'justify',
    color: 'white',
    fontFamily: 'Nunito-Regular',
  },
  animationContainer: {
    alignItems: 'flex-end',
  },
  lastAnimationContainer: {
    alignItems: 'flex-end',
    transform: [
      {
        scaleX: -1,
      },
    ],
  },
  pressContainer: {
    marginTop: 32,
    borderRadius: '10%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  pressText: {
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    color: 'white',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    backgroundColor: '#252b43',
  },
  lottieContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#1d2029',
  },
});
