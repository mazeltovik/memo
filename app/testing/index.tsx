import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import MenuItem from '../components/menuItem';

const localAssets = {
  time: require('../../assets/images/timer.svg'),
  memory: require('../../assets/images/cpu.svg'),
};

export default function Testing() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: 'Тесты',
          headerStyle: { backgroundColor: '#1d2029' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poiret-One',
            fontWeight: 'regular',
            color: '#daa543',
          },
        }}
      />
      <View style={styles.navContainer}>
        <MenuItem
          text={'тест на счет'}
          href={'../countTest'}
          path={localAssets.time}
        />
        <MenuItem
          text={'тест на память'}
          href={'../memoryTest'}
          path={localAssets.memory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#1d2029',
    justifyContent: 'center',
  },
  navWrapper: {
    gap: 16,
  },
  navContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    gap: 16,
    paddingBottom: 16,
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
