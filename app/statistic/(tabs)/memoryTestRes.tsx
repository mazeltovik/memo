import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { Paths } from 'expo-file-system/next';
import Accordion from '@/app/components/accordion';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainModal from '@/app/components/modalView';
import DeleteHistoryModal from '@/app/components/modals/deleteHistoryModal';
import { getData } from '@/app/scripts/filesystem/fs';
import { MemoryTestSavingData } from '@/app/scripts/filesystem/types';

export default function MemoryTestRes() {
  const [data, setData] = useState<MemoryTestSavingData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    const gettingData = () => {
      const data = getData<MemoryTestSavingData[]>(
        Paths.document,
        'memoData',
        'memoryTest.json'
      );
      setData(data);
    };
    try {
      gettingData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <MainModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <DeleteHistoryModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </MainModal>
      {data && (
        <View style={styles.deleteContainer}>
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="archive" size={40} color="#a52b36" />
          </TouchableOpacity>
        </View>
      )}
      {data && (
        <Accordion data={data} height={170} accordionItem={'memoryTest'} />
      )}
      {!data && (
        <View style={styles.lottieWrapper}>
          <Text style={styles.text}>Пусто</Text>
          <LottieView
            autoPlay={true}
            loop={true}
            source={require('../../../assets/animations/empty.json')}
            style={styles.lottieContainer}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#252b43',
    flex: 1,
  },
  deleteContainer: {
    paddingHorizontal: 8,
    alignItems: 'flex-end',
  },
  lottieWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  lottieContainer: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    color: '#daa543',
    textAlign: 'center',
  },
});
