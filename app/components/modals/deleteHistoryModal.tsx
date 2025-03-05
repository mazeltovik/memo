import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Paths } from 'expo-file-system/next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MainModalProps } from '../modalView';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';
import { clearFile, saveInit } from '@/app/scripts/filesystem/fs';

export default function DeleteHistoryModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const router = useRouter();
  const approvedPress = () => {
    const dirName = 'memoData';
    try {
      clearFile(Paths.document, dirName, 'challenge.json');
      clearFile(Paths.document, dirName, 'countTest.json');
      clearFile(Paths.document, dirName, 'memoryTest.json');
      clearFile(Paths.document, dirName, 'init.json');
      saveInit(Paths.document, dirName, 'init.json', {
        lastEntryDate: new Date().toString(),
        currentDay: 1,
      });
    } catch (err) {
      console.error(err);
    }
    setModalVisible(!modalVisible);
    router.dismissAll();
  };
  const disapprovedPress = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="alert" size={40} color="#a52b36" />
          </View>
          <Text style={styles.modalHeader} android_hyphenationFrequency="full">
            Вы уверены? Это действие удалит вашу историю тренировок и позволит
            начать все с начала.
          </Text>
        </View>
        <View style={{ justifyContent: 'space-around' }}>
          <ButtonWrapper>
            <ButtonContainer
              text={'да'}
              onClick={approvedPress}
              backgroundColor="#a52b36"
              color="white"
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <ButtonContainer
              text={'нет'}
              onClick={disapprovedPress}
              backgroundColor="#879c7d"
            />
          </ButtonWrapper>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: '#353945',
    borderRadius: 20,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    color: '#f6c25d',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'justify',
  },
});
