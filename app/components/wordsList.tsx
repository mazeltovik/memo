import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import WordTile from '../components/wordTile';
import ButtonWrapper, { ButtonContainer } from './buttonWrapper';

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

type wordListType = {
  windowWidth: number;
  setShowWordList: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSwipeList: React.Dispatch<React.SetStateAction<boolean>>;
  setStopTime: React.Dispatch<React.SetStateAction<boolean>>;
};
function List({
  windowWidth,
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
        {words.map((word, index) => {
          return (
            <WordTile
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
  },
});

const WordsList = memo(List);
export default WordsList;
