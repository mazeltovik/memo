import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Paths } from 'expo-file-system/next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MainModalProps } from '../modalView';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';
import { clearFile } from '@/app/scripts/filesystem/fs';
import fsConstants from '@/app/scripts/filesystem/constants';

export default function DeleteHistoryModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const router = useRouter();
  const approvedPress = () => {
    const { dirName, initFile, challengeFile, countTestFile, memoryTestFile } =
      fsConstants;
    try {
      clearFile(Paths.document, dirName, challengeFile);
      clearFile(Paths.document, dirName, countTestFile);
      clearFile(Paths.document, dirName, memoryTestFile);
      clearFile(Paths.document, dirName, initFile);
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
    <BlurView
      intensity={60}
      experimentalBlurMethod={true}
      tint="light"
      style={styles.modalWrapper}
    >
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
    </BlurView>
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
