import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Paths } from 'expo-file-system/next';
import { saveSimpleData, getData } from '@/app/scripts/filesystem/fs';
import fsConstants from '@/app/scripts/filesystem/constants';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';
import { MainModalProps } from '../modalView';
import { ModalsData } from '@/app/scripts/filesystem/types';

export default function ChallengeLearningModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const onPress = () => {
    try {
      const { dirName, modalsFile } = fsConstants;
      const data = getData<ModalsData>(Paths.document, dirName, modalsFile);
      if (data) {
        const { isCountTestShow, isMemoryTestShow, isProgressShow } = data;
        saveSimpleData(Paths.document, dirName, modalsFile, {
          isChallengeShow: true,
          isCountTestShow,
          isMemoryTestShow,
          isProgressShow,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalHeader}>Обучение.</Text>
          <Text style={styles.modalText} android_hyphenationFrequency="full">
            Привет! Перед вами тренировка для поддержания тонуса головного
            мозга. Вам предстоит решать простые арифметические примеры на
            сложение, вычитание, умножение и деление. Всего нужно решить 100
            примеров. Программа рассчитана на 60 дней. Например, вы можете
            заниматься с понедельника по пятницу по одному блоку упражнений в
            день, а в выходные - оценивать работу префронтальной коры своего
            головного мозга.
          </Text>
          <Image
            style={styles.img}
            source={require('../../../assets/images/challenge.gif')}
            alt={'Challenge gif'}
          />
          <Text style={styles.modalText} android_hyphenationFrequency="full">
            Старайтесь не прерывать тренировки — это может снизить их
            эффективность. Если вам нужно освежить правила прохождения
            тренировки, обратитесь в раздел "Обучение".
          </Text>
        </ScrollView>
        <ButtonWrapper>
          <ButtonContainer
            text={'понятно'}
            color="white"
            onClick={onPress}
            backgroundColor="#879c7d"
          />
        </ButtonWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: '#353945',
    padding: 16,
    margin: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalHeader: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 16,
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'justify',
  },
  img: {
    marginTop: 16,
    alignSelf: 'center',
    width: 250,
    height: 240,
    borderRadius: 16,
  },
});
