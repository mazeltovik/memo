import { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import LottieView from 'lottie-react-native';
import MainModal from './modal';
import InstructionModal from './modals/instructionModal';
import slidesData from '@/static/slidesData';

type SlideProps = {
  mainHeader: string;
  info: string;
  slideIndex: number;
  maxSlides: number;
  windowWidth: number;
};

function Slide({
  mainHeader,
  info,
  windowWidth,
  slideIndex,
  maxSlides,
}: SlideProps) {
  return (
    <View style={[slideStyles.slideContainer, { width: windowWidth }]}>
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

export default function Carousel() {
  const { width: windowWidth } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={carouselStyles.scrollContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const scrollX = Math.floor(event.nativeEvent.contentOffset.x);
          const totalWidth = Math.floor(windowWidth * (slidesData.length - 1));
          if (scrollX == totalWidth) {
            setModalVisible(true);
          }
        }}
      >
        {slidesData.map((slide, slideIndex, slides) => {
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
      {modalVisible && (
        <MainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <InstructionModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </MainModal>
      )}
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
    // backgroundColor:'#fcba03',
    gap: 16,
    flexGrow: 0.5,
    justifyContent: 'flex-end',
  },
  animationContainer: {
    alignItems: 'flex-end',
    // backgroundColor: '#fcba03'
  },
  lottieContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#c9ccf0',
  },
  mainHeader: {
    textAlign: 'center',
    paddingTop: 8,
    fontFamily: 'Nunito-Bold',
  },
  info: {
    // marginLeft:8,
    // marginRight:8,
    textAlign: 'justify',
    fontFamily: 'Nunito-Regular',
  },
});

const carouselStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c9ccf0',
  },
});
