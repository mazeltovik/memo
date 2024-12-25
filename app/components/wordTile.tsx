import { useEffect } from 'react';
import { Text, StyleSheet, Animated, useAnimatedValue } from 'react-native';
import getHex from '../scripts/getHex';

type wordTileTypes = {
  word: string;
  windowWidth: number;
  duration: number;
};

export default function WordTile({
  word,
  windowWidth,
  duration,
}: wordTileTypes) {
  const backgroundColor = getHex();
  const basicDuration = 1000;
  const translateX = useAnimatedValue(-windowWidth);
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: (basicDuration * duration) / 4,
      useNativeDriver: true,
    }).start();
  }, [translateX]);
  return (
    <Animated.View
      style={[
        { ...wordTileStyles.container, width: windowWidth * 0.9 },
        {
          transform: [
            {
              translateX: translateX,
            },
          ],
        },
      ]}
    >
      <Text
        style={[
          {
            ...wordTileStyles.tileHeader,
            backgroundColor: backgroundColor,
          },
        ]}
      />
      <Text style={wordTileStyles.text}>{word}</Text>
    </Animated.View>
  );
}

const wordTileStyles = StyleSheet.create({
  container: {
    marginBottom: 35,
    backgroundColor: '#252b43',
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
  },
  tileHeader: {
    height: 4,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'Nunito-Regular',
    marginBottom: 10,
  },
});
