import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SwipeCard from './swipeCard';
import ButtonWrapper, { SwipeBtn } from './buttonWrapper';

type SwipeListProps = {
  windowHeight: number;
  approved: string[];
  rejected: string[];
  setApproved: React.Dispatch<React.SetStateAction<string[]>>;
  setRejected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function SwipeList({
  windowHeight,
  approved,
  setApproved,
  rejected,
  setRejected,
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
  const removeTopCard = useCallback(() => {
    setWords((prevState) => {
      return prevState.slice(1);
    });
  }, []);
  return (
    <View style={styles.wrapper}>
      {words.length == 0 ? (
        <View
          style={{ ...styles.lottieWrapper, marginTop: windowHeight * 0.4 }}
        >
          <LottieView
            autoPlay={true}
            loop={false}
            source={require('../../assets/animations/congratulations.json')}
            style={styles.lottieContainer}
          />
        </View>
      ) : (
        <View style={styles.container}>
          {words
            .map((word, index) => {
              return (
                <SwipeCard
                  word={word}
                  key={index + word}
                  windowHeight={windowHeight}
                  removeTopCard={removeTopCard}
                  approved={approved}
                  rejected={rejected}
                  setApproved={setApproved}
                  setRejected={setRejected}
                />
              );
            })
            .reverse()}
        </View>
      )}
      {words.length == 0 && (
        <ButtonWrapper>
          <SwipeBtn text="вперед" />
        </ButtonWrapper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  lottieWrapper: {
    alignItems: 'center',
  },
  lottieContainer: {
    width: 80,
    height: 80,
  },
});
