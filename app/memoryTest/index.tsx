import { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Countdown from '../components/countDown';
import MemoryList from './memoryList';
import SwipeView from './swipeView';
import ButtonWrapper, { StartBtn } from '../components/buttonWrapper';
import ResView from './resView';
import MainModal from '../components/modalView';
import BackHandlerModal from '../components/modals/backHandlerModal';
import shuffle from '../scripts/shuffle';
import { localAnimations } from '../_layout';
import getMemoryWords from '../scripts/getMemoryWords';

export default function MemoryTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [showIntro, setShowIntro] = useState(true);
  const [showWordList, setShowWordList] = useState(false);
  const [showSwipeView, setShowSwipeView] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(120);
  const [stopTime, setStopTime] = useState(false);
  const [finishedTranslate, setFinishedTranslate] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [approvedWords, setApprovedWords] = useState<string[]>([]);
  const [score, setScore] = useState({ correct: 0, percentage: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const { initialWords, shuffleInitialWords, shuffleWrongWords } =
    useMemo(() => {
      const [initialWords, wrongWords] = getMemoryWords();
      const shuffleInitialWords = shuffle(initialWords);
      const shuffleWrongWords = shuffle(wrongWords);
      const totalRes = shuffle([...shuffleInitialWords, ...shuffleWrongWords]);
      setWords(totalRes);
      return { initialWords, shuffleInitialWords, shuffleWrongWords };
    }, []);
  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const onStart = () => {
    setShowIntro(!showIntro);
    setShowWordList(!showWordList);
  };
  return (
    <View style={styles.wrapper}>
      <MainModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <BackHandlerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </MainModal>
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
              setShowSwipeList={setShowSwipeView}
            />
            {finishedTranslate && (
              <MemoryList
                windowWidth={windowWidth}
                initialWords={initialWords}
                setShowWordList={setShowWordList}
                setShowSwipeList={setShowSwipeView}
                setStopTime={setStopTime}
              />
            )}
          </View>
        )}
        {showSwipeView && (
          <SwipeView
            windowHeight={windowHeight}
            words={words}
            activeWord={words[0]}
            shuffleInitialWords={shuffleInitialWords}
            approvedWords={approvedWords}
            totalSteps={initialWords.length + shuffleWrongWords.length}
            setWords={setWords}
            setShowResult={setShowResult}
            setShowSwipeView={setShowSwipeView}
            setApprovedWords={setApprovedWords}
            setScore={setScore}
          />
        )}
        {showResult && (
          <ResView
            windowWidth={windowWidth}
            score={score}
            waves={localAnimations.waves}
            totalLen={shuffleInitialWords.length}
            initialWords={initialWords}
            approvedWords={approvedWords}
            shuffleWrongWords={shuffleWrongWords}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
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
