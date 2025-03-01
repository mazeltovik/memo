import { Tabs } from 'expo-router';
import { Image } from 'expo-image';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f6c25d',
        headerStyle: {
          backgroundColor: '#252b43',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poiret-One',
          fontWeight: 'regular',
          color: '#daa543',
        },
        tabBarStyle: {
          backgroundColor: '#252b43',
        },
        tabBarLabelStyle: {
          fontFamily: 'Poiret-One',
          fontWeight: 'regular',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Тренировка',
          tabBarIcon: () => (
            <Image
              alt={'тренировка'}
              source={require('../../../assets/images/brain.svg')}
              style={[{ width: 30, height: 30 }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="countTestRes"
        options={{
          title: 'Тест на счёт',
          tabBarIcon: () => (
            <Image
              alt={'тест на счет'}
              source={require('../../../assets/images/timer.svg')}
              style={[{ width: 30, height: 30 }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="memoryTestRes"
        options={{
          title: 'Тест на память',
          tabBarIcon: () => (
            <Image
              alt={'тест на память'}
              source={require('../../../assets/images/cpu.svg')}
              style={[{ width: 30, height: 30 }]}
            />
          ),
        }}
      />
    </Tabs>
  );
}
