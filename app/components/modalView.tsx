import { PropsWithChildren } from 'react';
import { Modal } from 'react-native';

export type MainModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainModal({
  modalVisible,
  setModalVisible,
  children,
}: PropsWithChildren<MainModalProps>) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {children}
    </Modal>
  );
}
