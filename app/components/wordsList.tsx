import { memo } from 'react';
import { ScrollView } from 'react-native';
import WordTile from '../components/wordTile';

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
};
function List({ windowWidth }: wordListType) {
  return (
    <ScrollView style={{ marginTop: 140 }}>
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
  );
}

const WordsList = memo(List);
export default WordsList;
