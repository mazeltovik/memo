import { Stack } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import MenuItem from '../components/menuItem';
import { localAssets } from '../_layout';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Learning() {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: 'Обучение',
          headerStyle: { backgroundColor: '#1d2029' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poiret-One',
            fontWeight: 'regular',
            color: '#daa543',
            fontSize: 16,
          },
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => router.dismissAll()}
                style={{
                  paddingHorizontal: 8,
                }}
              >
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={40}
                  color="#daa543"
                />
              </Pressable>
            );
          },
        }}
      />
      <View style={styles.navContainer}>
        <MenuItem
          text={'Введение'}
          href={'../slides/intro'}
          path={localAssets.intro}
        />
        <MenuItem
          text={'Тренировка'}
          href={'../slides/training'}
          path={localAssets.exercise}
        />
      </View>
      <View style={styles.navContainer}>
        <MenuItem
          text={'Тест на счет'}
          href={'../slides/countTest'}
          path={localAssets.time}
        />
        <MenuItem
          text={'Тест на память'}
          href={'../slides/memoryTest'}
          path={localAssets.memory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
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
