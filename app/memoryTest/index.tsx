import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Countdown from '../components/countDown';
import WordsList from '../components/wordsList';
import SwipeList from '../components/swipeList';
import ButtonWrapper, { StartBtn } from '../components/buttonWrapper';
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
  const onStart = () => {
    setShowIntro(!showIntro);
    setShowWordList(!showWordList);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {showIntro && (
          <View style={styles.btnContainer}>
            <ButtonWrapper>
              <StartBtn text="старт" onClick={onStart} />
            </ButtonWrapper>
          </View>
        )}
        {showWordList && (
          <View style={styles.wordListContainer}>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1d2029',
  },
  container: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
