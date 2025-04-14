import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Paths } from 'expo-file-system/next';
import { saveSimpleData, getData } from '@/app/scripts/filesystem/fs';
import fsConstants from '@/app/scripts/filesystem/constants';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';
import { MainModalProps } from '../modalView';
import { ModalsData } from '@/app/scripts/filesystem/types';

export default function MemoryLearningModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const onPress = () => {
    try {
      const { dirName, modalsFile } = fsConstants;
      const data = getData<ModalsData>(Paths.document, dirName, modalsFile);
      if (data) {
        const { isChallengeShow, isCountTestShow, isProgressShow } = data;
        saveSimpleData(Paths.document, dirName, modalsFile, {
          isChallengeShow,
          isCountTestShow,
          isMemoryTestShow: true,
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
            Привет! Перед вами тест на память. Упражнение содержит 30 простых
            слов. Необходимо запомнить как можно больше из них, в течении двух
            минут.
          </Text>
          <Image
            style={styles.img}
            source={require('../../../assets/images/memoryList.gif')}
            alt={'Challenge gif'}
          />
          <Text style={styles.modalText} android_hyphenationFrequency="full">
            По истечении времени вам необходимо определить, было ли данное слово
            в списке: смахните вправо, если оно было, и влево — если нет. Для
            усложнения задания будет добавлено 15 слов, которых не было в
            исходном списке. Количество правильно воспроизведённых слов — это
            ваша оценка.
          </Text>
          <Image
            style={styles.img}
            source={require('../../../assets/images/memoryCard.gif')}
            alt={'Challenge gif'}
          />
          <Text style={styles.modalText} android_hyphenationFrequency="full">
            Цель данного упражнения - оценить активность в левом полушарии
            мозга, отвечающей за кротковременную память. Если вам нужно освежить
            правила прохождения теста, обратитесь в раздел "Обучение".
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
