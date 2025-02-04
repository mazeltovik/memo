import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
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
  return (
    <View style={carouselStyles.scrollContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
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
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
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
    backgroundColor: '#1d2029',
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
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d2029',
  },
});
