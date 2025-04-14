import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MemoryWord from './memoryWord';
import ButtonWrapper, { ButtonContainer } from '../components/buttonWrapper';

type wordListType = {
  windowWidth: number;
  initialWords: string[];
  setShowWordList: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSwipeList: React.Dispatch<React.SetStateAction<boolean>>;
  setStopTime: React.Dispatch<React.SetStateAction<boolean>>;
};
function List({
  windowWidth,
  initialWords,
  setShowWordList,
  setShowSwipeList,
  setStopTime,
}: wordListType) {
  const onClick = () => {
    setShowWordList(false);
    setShowSwipeList(true);
    setStopTime(true);
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollContainer}>
        {initialWords.map((word, index) => {
          return (
            <MemoryWord
              word={word}
              windowWidth={windowWidth}
              duration={index++}
              key={index}
            />
          );
        })}
      </ScrollView>
      <ButtonWrapper>
        <ButtonContainer text="вперед" onClick={onClick} />
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  scrollContainer: {
    marginTop: 140,
    height: '70%',
    zIndex: 1000,
  },
});

const MemoryList = memo(List);
export default MemoryList;
