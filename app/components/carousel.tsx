import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  Animated,
  useAnimatedValue,
} from 'react-native';
import LottieView from 'lottie-react-native';

type SlideProps = {
  mainHeader: string;
  info: string;
  slideIndex: number;
  maxSlides: number;
  windowWidth: number;
};

type SlideData = {
  mainHeader: string;
  info: string;
};

type CarouselProps = {
  data: SlideData[];
};

function Slide({
  mainHeader,
  info,
  windowWidth,
  slideIndex,
  maxSlides,
}: SlideProps) {
  return (
    <View style={[slideStyles.slideContainer, { width: windowWidth - 32 }]}>
      <View style={slideStyles.slideHeader}>
        <Text style={slideStyles.mainHeader}>{mainHeader}</Text>
        <Text style={slideStyles.info} android_hyphenationFrequency="full">
          {info}
        </Text>
      </View>
      <View style={slideStyles.animationContainer}>
        <LottieView
          autoPlay
          style={[
            slideStyles.lottieContainer,
            {
              transform:
                slideIndex == maxSlides ? [{ scaleX: -1 }, { scaleY: 1 }] : '',
            },
          ]}
          source={require('../../assets/animations/swipeHand.json')}
        />
      </View>
    </View>
  );
}

export default function Carousel({ data }: CarouselProps) {
  const { width: windowWidth } = useWindowDimensions();
  const scrollX = useAnimatedValue(0);
  return (
    <View style={carouselStyles.scrollWrapper}>
      <View style={carouselStyles.indicatorContainer}>
        {data.map((_, slideIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (slideIndex - 1),
              windowWidth * slideIndex,
              windowWidth * (slideIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={slideIndex}
              style={[carouselStyles.normalDot, { width }]}
            />
          );
        })}
      </View>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        style={carouselStyles.scrollContainer}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
      >
        {data.map((slide, slideIndex, slides) => {
          return (
            <Slide
              mainHeader={slide.mainHeader}
              info={slide.info}
              windowWidth={windowWidth}
              key={slideIndex}
              slideIndex={slideIndex}
              maxSlides={slides.length - 1}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const slideStyles = StyleSheet.create({
  slideContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: '#333a56',
  },
  slideHeader: {
    gap: 16,
    flexGrow: 0.5,
    justifyContent: 'flex-end',
  },
  animationContainer: {
    alignItems: 'flex-end',
  },
  lottieContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#333a56',
  },
  mainHeader: {
    color: '#daa543',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    paddingTop: 8,
  },
  info: {
    textAlign: 'justify',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    color: '#fbd499',
  },
});

const carouselStyles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
  indicatorContainer: {
    width: '100%',
    paddingTop: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333a56',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#daa543',
    marginHorizontal: 4,
  },
  scrollContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
