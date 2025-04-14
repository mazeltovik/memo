import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MainModalProps } from '../modalView';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';

export default function BackHandlerModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const router = useRouter();

  const approvedPress = () => {
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
        <View style={{ alignItems: 'center' }}>
          <Ionicons name="alert" size={40} color="#a52b36" />
        </View>
        <Text style={styles.modalHeader}>Вы уверены?</Text>
        <View style={{ justifyContent: 'space-around' }}>
          <ButtonWrapper>
            <ButtonContainer
              text={'продолжить'}
              color="white"
              onClick={disapprovedPress}
              backgroundColor="#879c7d"
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <ButtonContainer
              text={'выйти'}
              onClick={approvedPress}
              backgroundColor="#a52b36"
              color="white"
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
    paddingLeft: 16,
    paddingRight: 16,
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
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
  },
});
