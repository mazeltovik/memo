import { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  ScrollView,
  Text,
  useAnimatedValue,
  Dimensions,
} from 'react-native';
import SwipeCard from './swipeCard';

const words = [
  'полдень',
  'секция',
  'тюбик',
  'медведь',
  'рюкзак',
  'сироп',
  'цвет',
  'ремень',
  'брат',
  'бумага',
  'разум',
  'точка',
  'офис',
];

type SwipeListProps = {
  windowWidth: number;
  windowHeight: number;
};

export default function SwipeList({
  windowWidth,
  windowHeight,
}: SwipeListProps) {
  const [words, setWords] = useState([
    'полдень',
    'секция',
    'тюбик',
    'медведь',
    'рюкзак',
    'сироп',
    'цвет',
    'ремень',
    'брат',
    'бумага',
    'разум',
    'точка',
    'офис',
  ]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {words
          .map((word, index) => {
            return (
              <SwipeCard
                word={word}
                key={index + word}
                setWords={setWords}
                windowHeight={windowHeight}
              />
            );
          })
          .reverse()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0.5,
    width: '100%',
  },
  container: {
    position: 'relative',
  },
});
