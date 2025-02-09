import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MenuItem from './components/menuItem';
// import Carousel from './components/carousel';
// import introSlides from './slides/intro/introSlides';
// import Tutorial from './tutorial';
// import WordTest from './training/wordTest';
// import MainChallenge from './challenge';
//////////////////////////////////////
// import CountTest from './training/countTest';
// import MemoryTest from './training/memoryTest';

const localAssets = {
  exercise: require('../assets/images/brain.svg'),
  training: require('../assets/images/tests.svg'),
  learning: require('../assets/images/book-open-text.svg'),
  statistic: require('../assets/images/chart-line.svg'),
};

export const localAnimations = {
  goldMedal: require('../assets/animations/goldMedal.json'),
  silverMedal: require('../assets/animations/silverMedal.json'),
  bronzeMedal: require('../assets/animations/bronzeMedal.json'),
  chill: require('../assets/animations/chill.json'),
};

export default function App() {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.header}>Memo</Text>
      </View>
      <View style={styles.navWrapper}>
        <View style={styles.navContainer}>
          <MenuItem
            text={'тренировка'}
            href={'/challenge'}
            path={localAssets.exercise}
          />
          <MenuItem
            text={'тесты'}
            href={'/testing'}
            path={localAssets.training}
          />
        </View>
        <View style={styles.navContainer}>
          <MenuItem
            text={'обучение'}
            href={'/learning'}
            path={localAssets.learning}
          />
          <MenuItem
            text={'статистика'}
            href={''}
            path={localAssets.statistic}
          />
        </View>
      </View>
      <View>
        <Text style={styles.footerText}>{new Date().getFullYear()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#1d2029',
    justifyContent: 'space-between',
  },
  header: {
    color: '#daa543',
    textAlign: 'center',
    fontSize: 64,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  navWrapper: {
    gap: 16,
  },
  navContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    gap: 16,
    flexDirection: 'row',
  },
  footerText: {
    color: '#f6c25d',
    fontSize: 10,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
  },
});
