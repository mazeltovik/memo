import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Countdown from '../components/countDown';
import WordsList from '../components/wordsList';
import SwipeList from '../components/swipeList';
import Intro from './wordTestSlides/intro';
import WordTestRes from '../components/wordTestRes';

export default function WordTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [showIntro, setShowIntro] = useState(false);
  const [showWordList, setShowWordList] = useState(false);
  const [showSwipeList, setShowSwipeList] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(50);
  const [stopTime, setStopTime] = useState(false);
  const [finishedTranslate, setFinishedTranslate] = useState(false);
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={wordTestStyles.wrapper}>
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
          {showResult && <WordTestRes />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const wordTestStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1d2029',
  },
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  wordListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
