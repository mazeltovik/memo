import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Paths } from 'expo-file-system/next';
import { getData, saveSimpleData } from '@/app/scripts/filesystem/fs';
import fsConstants from '@/app/scripts/filesystem/constants';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';
import { MainModalProps } from '../modalView';
import { ModalsData } from '@/app/scripts/filesystem/types';

export default function ProgressLearningModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const onPress = () => {
    try {
      const { dirName, modalsFile } = fsConstants;
      const data = getData<ModalsData>(Paths.document, dirName, modalsFile);
      if (data) {
        const { isChallengeShow, isMemoryTestShow, isCountTestShow } = data;
        saveSimpleData(Paths.document, dirName, modalsFile, {
          isChallengeShow,
          isCountTestShow,
          isMemoryTestShow,
          isProgressShow: true,
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
            Привет! Перед вами раздел с вашим прогрессом. Здесь можно увидеть:
            дату начала тренировки, дату окончания тренировки, текущий день
            тренировки, а также ближайшую дату оценки работы префронтальной коры
            головного мозга. Пройдите, пожалуйста, тренировку, чтобы увидеть
            данные.
          </Text>
          <Image
            style={styles.img}
            source={require('../../../assets/images/progress.gif')}
            alt={'Challenge gif'}
          />
          <Text style={styles.modalText} android_hyphenationFrequency="full">
            Также вам доступна история ваших тренировок и тестов. Всегда
            сохраняется лучший результат за день. Данные тестов начинают
            сохраняться только после того, как вы пройдёте хотя бы одну
            тренировку. Вы всегда можете сбросить текущий прогресс, нажав на
            кнопку "Удалить прогресс".
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
