import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Paths } from 'expo-file-system/next';
import Ionicons from '@expo/vector-icons/Ionicons';
import MainModal from '@/app/components/modalView';
import ProgressLearningModal from '@/app/components/modals/progressLearningModal';
import DeleteHistoryModal from '@/app/components/modals/deleteHistoryModal';
import { getData } from '@/app/scripts/filesystem/fs';
import getDate from '@/app/scripts/getDate';
import fsConstants from '@/app/scripts/filesystem/constants';
import Progress, { ModalsData } from '@/app/scripts/filesystem/types';

export default function CalendarView() {
  const [data, setData] = useState<Progress | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [learningModalVisible, setLearningModalVisible] = useState(false);
  const onPress = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    const gettingData = () => {
      const { dirName, initFile, modalsFile } = fsConstants;
      const data = getData<Progress>(Paths.document, dirName, initFile);
      if (data) {
        setData(data);
      }
      const modalsData = getData<ModalsData>(
        Paths.document,
        dirName,
        modalsFile
      );
      if (modalsData) {
        const { isProgressShow } = modalsData;
        if (!isProgressShow) setLearningModalVisible(true);
      }
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
        {learningModalVisible && (
          <MainModal
            modalVisible={learningModalVisible}
            setModalVisible={setLearningModalVisible}
          >
            <ProgressLearningModal
              modalVisible={learningModalVisible}
              setModalVisible={setLearningModalVisible}
            />
          </MainModal>
        )}
        {data && (
          <View style={styles.deleteContainer}>
            <TouchableOpacity onPress={onPress}>
              <Ionicons name="archive" size={40} color="#a52b36" />
            </TouchableOpacity>
          </View>
        )}
        {data && (
          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={[styles.info, { flex: 1 }]}>Начало тренировки:</Text>
              <Text style={[styles.info, { flex: 1, textAlign: 'right' }]}>
                {getDate(data.start)}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={[styles.info, { flex: 1 }]}>
                Текущий день тренировки:
              </Text>
              <Text style={[styles.info, { flex: 1, textAlign: 'right' }]}>
                {data.currentDay}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={[styles.info, { flex: 1 }]}>Конец тренировки:</Text>
              <Text style={[styles.info, { flex: 1, textAlign: 'right' }]}>
                {getDate(data.finish)}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={[styles.info, { flex: 1 }]}>
                Оценка работы префронтальной коры головного мозга:
              </Text>
              <Text style={[styles.info, { flex: 1, textAlign: 'right' }]}>
                {getDate(data.checkDay)}
              </Text>
            </View>
          </ScrollView>
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
  content: {
    paddingHorizontal: 8,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  info: {
    flex: 1,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    color: '#daa543',
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
