import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MenuItem from './components/menuItem';
import IntroModal from './components/modals/introModal';
import MainModal from './components/modalView';
import { Paths } from 'expo-file-system/next';
import Progress from './scripts/filesystem/types';
import isDirExist, {
  createDir,
  createFile,
  getData,
  saveSimpleData,
} from './scripts/filesystem/fs';
import getDiffDate from './scripts/getDiffDate';
import fsConstants from './scripts/filesystem/constants';
import getNextDate from './scripts/getNextDate';
import { localAssets } from './_layout';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const preparationInit = () => {
      const {
        dirName,
        initFile,
        challengeFile,
        countTestFile,
        memoryTestFile,
        modalsFile,
      } = fsConstants;
      const isExist = isDirExist(Paths.document, dirName);
      if (!isExist) {
        const isDirCreated = createDir(Paths.document, dirName);
        if (isDirCreated) {
          createFile(Paths.document, dirName, initFile);
          createFile(Paths.document, dirName, challengeFile);
          createFile(Paths.document, dirName, countTestFile);
          createFile(Paths.document, dirName, memoryTestFile);
          createFile(Paths.document, dirName, modalsFile);
          saveSimpleData(Paths.document, dirName, modalsFile, {
            isChallengeShow: false,
            isCountTestShow: false,
            isMemoryTestShow: false,
            isProgressShow: false,
          });
        }
        setModalVisible(true);
      } else {
        const data = getData<Progress>(Paths.document, dirName, initFile);
        if (data) {
          const nowDate = new Date().toString();
          const { start, checkDay, finish, currentDay, visitedDay } = data;
          const diffDays = getDiffDate(visitedDay, nowDate);
          if (diffDays) {
            const newCurrentDay = currentDay + diffDays;
            const newCheckDay =
              newCurrentDay % 5 == 0 ? getNextDate(checkDay, 5) : checkDay;
            saveSimpleData(Paths.document, dirName, initFile, {
              start,
              finish,
              currentDay: newCurrentDay,
              visitedDay: nowDate,
              checkDay: newCheckDay,
            });
          }
        }
      }
    };
    try {
      preparationInit();
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <View style={styles.wrapper}>
      <MainModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <IntroModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </MainModal>
      <View>
        <Text style={styles.header}>Memo</Text>
      </View>
      <View style={styles.navWrapper}>
        <View style={styles.navContainer}>
          <MenuItem
            text={'Тренировка'}
            href={'./challenge'}
            path={localAssets.exercise}
          />
          <MenuItem
            text={'Тесты'}
            href={'./testing'}
            path={localAssets.training}
          />
        </View>
        <View style={styles.navContainer}>
          <MenuItem
            text={'Обучение'}
            href={'./learning'}
            path={localAssets.learning}
          />
          <MenuItem
            text={'Прогресс'}
            href={'./progress'}
            path={localAssets.statistic}
          />
        </View>
      </View>
      <View>
        <Text style={styles.footerText}>{new Date().getFullYear()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1d2029',
    justifyContent: 'space-between',
  },
  header: {
    color: '#daa543',
    textAlign: 'center',
    fontSize: 64,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
  navWrapper: {
    gap: 16,
  },
  navContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    gap: 16,
    flexDirection: 'row',
  },
  footerText: {
    color: '#f6c25d',
    fontSize: 10,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
  },
});
