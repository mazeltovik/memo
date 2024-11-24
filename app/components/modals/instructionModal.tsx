import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { MainModalProps } from '../modal';

export default function InstructionModal({modalVisible,setModalVisible}:MainModalProps){
    return (
        <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text>Choose a sticker</Text>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContent:{
        height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    },
    titleContainer:{
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalView: {
    //   margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
    //   padding: 35,
      alignItems: 'center',
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
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
    //   marginBottom: 15,
      textAlign: 'center',
    },
  });