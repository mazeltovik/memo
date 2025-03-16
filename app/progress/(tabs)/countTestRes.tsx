import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { Paths } from 'expo-file-system/next';
import Accordion from '@/app/components/accordion';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainModal from '@/app/components/modalView';
import DeleteHistoryModal from '@/app/components/modals/deleteHistoryModal';
import { getData } from '@/app/scripts/filesystem/fs';
import { CountTestData } from '@/app/scripts/filesystem/types';
import fsConstants from '@/app/scripts/filesystem/constants';

export default function CounteTestRes() {
  const [data, setData] = useState<CountTestData[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const onPress = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    const gettingData = () => {
      const { dirName, countTestFile } = fsConstants;
      const data = getData<CountTestData[]>(
        Paths.document,
        dirName,
        countTestFile
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
      <View style={styles.container}>
        <MainModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
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
          <Accordion data={data} height={170} accordionItem={'counteTest'} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1d2029',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#252b43',
    borderRadius: 8,
    margin: 16,
  },
  deleteContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
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
