import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  useAnimatedValue,
  Dimensions,
} from 'react-native';

// https://medium.com/@jesusalvan2010/making-a-tinder-swipe-cards-in-react-native-eaa290e92be2
// https://instamobile.io/react-native-controls/react-native-swipe-cards-tinder/

type SwipeCardProps = {
  word: string;
  windowHeight: number;
  removeTopCard: () => void;
  approved: string[];
  rejected: string[];
  setApproved: React.Dispatch<React.SetStateAction<string[]>>;
  setRejected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function SwipeCard({
  word,
  windowHeight,
  removeTopCard,
  approved,
  rejected,
  setApproved,
  setRejected,
}: SwipeCardProps) {
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy, y0 }) => {
        swipe.setValue({ x: dx, y: dy });
        titlSign.setValue(y0 > (windowHeight * 0.9) / 2 ? 1 : -1);
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        const diraction = Math.sign(dx);
        const isSwipedOffScreen = Math.abs(dx) > 100;
        if (isSwipedOffScreen) {
          Animated.timing(swipe, {
            duration: 100,
            toValue: {
              x: diraction * 800,
              y: dy,
            },
            useNativeDriver: true,
          }).start(() => {
            if (~diraction) {
              setApproved([...approved, word]);
            } else {
              setRejected([...rejected, word]);
            }
            removeTopCard();
          });
          return;
        }
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      },
    })
  ).current;
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['8deg', '0deg', '-8deg'],
  });
  const yesOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={[
        { ...styles.container, height: windowHeight * 0.5 },
        {
          transform: [...swipe.getTranslateTransform(), { rotate }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={{
          ...styles.textContainer,
        }}
      >
        <Animated.Text style={[styles.yesText, { opacity: yesOpacity }]}>
          было
        </Animated.Text>
        <Animated.Text style={[styles.nopeText, { opacity: nopeOpacity }]}>
          не было
        </Animated.Text>
      </View>
      <Animated.View
        style={[
          { ...styles.borderContainer, borderColor: '#335e25' },
          {
            height: windowHeight * 0.5,
            opacity: yesOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          { ...styles.borderContainer, borderColor: '#8a560a' },
          {
            height: windowHeight * 0.5,
            opacity: nopeOpacity,
          },
        ]}
      />
      <Text style={styles.text}>{word}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 3,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#252b43',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'Nunito-Regular',
  },
  borderContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    borderWidth: 5,
    borderRadius: 10,
  },
  yesText: {
    position: 'absolute',
    fontSize: 15,
    textAlign: 'center',
    color: '#335e25',
    textTransform: 'capitalize',
    fontFamily: 'Nunito-Regular',
  },
  nopeText: {
    position: 'absolute',
    fontSize: 15,
    textAlign: 'center',
    color: '#8a560a',
    textTransform: 'capitalize',
    fontFamily: 'Nunito-Regular',
  },
});
