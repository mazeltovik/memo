import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Paths } from 'expo-file-system/next';
import { saveSimpleData, getData } from '@/app/scripts/filesystem/fs';
import fsConstants from '@/app/scripts/filesystem/constants';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';
import { MainModalProps } from '../modalView';
import { ModalsData } from '@/app/scripts/filesystem/types';

export default function CountTestLearningModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const onPress = () => {
    try {
      const { dirName, modalsFile } = fsConstants;
      const data = getData<ModalsData>(Paths.document, dirName, modalsFile);
      if (data) {
        const { isChallengeShow, isMemoryTestShow, isProgressShow } = data;
        saveSimpleData(Paths.document, dirName, modalsFile, {
          isChallengeShow,
          isCountTestShow: true,
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
            Привет! В этом тесте потребуется произносить вслух числа от 1 до 120
            так быстро, как только сможете. Приложение засечет время, которые вы
            потратили на прохождение данного теста. Тест позволяет оценить общую
            работу префронтальной коры. Когда Вы досчитаете до 120 нажмите на
            кнопку Стоп и посмотрите свой результат.
          </Text>
          <Image
            style={styles.img}
            source={require('../../../assets/images/countTest.gif')}
            alt={'Count test gif'}
          />
          <Text style={styles.modalText} android_hyphenationFrequency="full">
            Четко произносите каждую цифру. Пожалуйста, установите собственный
            лимит времени и постарайтесь не выходить за его рамки. Если вам
            нужно освежить правила прохождения теста, обратитесь в раздел
            "Обучение".
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
