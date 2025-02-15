import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Countdown from '../components/countDown';
import MemoryList from './memoryList';
import SwipeView from './swipeView';
import ButtonWrapper, { StartBtn } from '../components/buttonWrapper';
import ResView from './resView';
import shuffle from '../scripts/shuffle';

const localAnimations = {
  waves: require('../../assets/animations/waves.json'),
};

export default function MemoryTest() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [showIntro, setShowIntro] = useState(true);
  const [showWordList, setShowWordList] = useState(false);
  const [showSwipeView, setShowSwipeView] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(50);
  const [stopTime, setStopTime] = useState(false);
  const [finishedTranslate, setFinishedTranslate] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [approvedWords, setApprovedWords] = useState<string[]>([]);
  const [score, setScore] = useState({ correct: 0, percentage: 0, fine: 0 });
  const { initialWords, shuffleInitialWords } = useMemo(() => {
    const initialWords = [
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
    const wrongWords = [
      'рис',
      'поэма',
      'пример',
      'воздух',
      'доска',
      'право',
      'ценность',
      'плавание',
      'сторона',
      'танец',
      'лодка',
    ];
    const shuffleInitialWords = shuffle(initialWords).slice(0, 7);
    const shuffleWrongWords = shuffle(wrongWords).slice(0, 3);
    const totalRes = shuffle([...shuffleInitialWords, ...shuffleWrongWords]);
    console.log(shuffleInitialWords);
    console.log(shuffleWrongWords);
    setWords(totalRes);
    return { initialWords, shuffleInitialWords };
  }, []);

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
          />
        )}
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
