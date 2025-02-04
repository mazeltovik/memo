import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Countdown from '../components/countDown';
import WordsList from '../components/wordsList';
import SwipeList from '../components/swipeList';
import Intro from './memoryTestSlides/intro';
import MemoryTestRes from './memoryTestRes';

export default function MemoryTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [showIntro, setShowIntro] = useState(true);
  const [showWordList, setShowWordList] = useState(false);
  const [showSwipeList, setShowSwipeList] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(50);
  const [stopTime, setStopTime] = useState(false);
  const [finishedTranslate, setFinishedTranslate] = useState(false);
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  return (
    <View style={wordTestStyles.wrapper}>
      <View style={wordTestStyles.container}>
        {showIntro && (
          <Intro
            setShowIntro={setShowIntro}
            setShowWordList={setShowWordList}
          />
        )}
        {showWordList && (
          <View style={wordTestStyles.wordListContainer}>
            <Countdown
              time={time}
              stopTime={stopTime}
              setTime={setTime}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              finishedTranslate={finishedTranslate}
              setFinishedTranslate={setFinishedTranslate}
              setShowWordList={setShowWordList}
              setShowSwipeList={setShowSwipeList}
            />
            {finishedTranslate && (
              <WordsList
                windowWidth={windowWidth}
                setShowWordList={setShowWordList}
                setShowSwipeList={setShowSwipeList}
                setStopTime={setStopTime}
              />
            )}
          </View>
        )}
        {showSwipeList && (
          <SwipeList
            windowHeight={windowHeight}
            approved={approved}
            setApproved={setApproved}
            rejected={rejected}
            setRejected={setRejected}
          />
        )}
        {showResult && <MemoryTestRes windowWidth={windowWidth} />}
      </View>
    </View>
  );
}

const wordTestStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1d2029',
  },
  container: {
    flex: 1,
  },
  wordListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
