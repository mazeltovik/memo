import { StyleSheet, View } from 'react-native';
import ButtonWrapper, { IntroButton } from '../../components/buttonWrapper';
import { SetStateAction } from 'react';

type IntroTypes = {
  setShowIntro: React.Dispatch<SetStateAction<boolean>>;
  setShowWordList: React.Dispatch<SetStateAction<boolean>>;
};

export default function Intro({ setShowIntro, setShowWordList }: IntroTypes) {
  return (
    <View style={styles.container}>
      <ButtonWrapper>
        <IntroButton
          text={'Старт'}
          setShowIntro={setShowIntro}
          setShowWordList={setShowWordList}
        />
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
