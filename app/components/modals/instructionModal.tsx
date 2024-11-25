import { StyleSheet, Text, Pressable, View } from 'react-native';
import { MainModalProps } from '../modal';

export default function InstructionModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  return (
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Начнем?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Pressable
          style={[styles.button, styles.buttonApprove]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Вперед!</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonFailed]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Перечитать.</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    gap: 16,
    margin: 20,
    marginTop: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonApprove: {
    backgroundColor: '#2196F3',
  },
  buttonFailed: {
    backgroundColor: '#5c050a',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
  },
  modalText: {
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
});
