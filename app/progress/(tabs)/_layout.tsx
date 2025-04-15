import { Tabs } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#f6c25d',
        headerStyle: {
          backgroundColor: '#1d2029',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Poiret-One',
          fontWeight: 'regular',
          color: '#daa543',
          fontSize: 16,
        },
        tabBarStyle: {
          backgroundColor: '#1d2029',
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poiret-One',
          fontWeight: 'regular',
        },
        tabBarShowLabel: false,
        headerShown: true,
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
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Календарь',
          tabBarIcon: ({ focused }) => (
            <View style={[{ opacity: focused ? 1 : 0.5 }]}>
              <Ionicons name="calendar-outline" size={30} color="#fbd499" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="challengeRes"
        options={{
          title: 'Тренировка',
          tabBarIcon: ({ focused }) => (
            <Image
              alt={'тренировка'}
              source={require('../../../assets/images/brain.svg')}
              style={[{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="countTestRes"
        options={{
          title: 'Тест на счёт',
          tabBarIcon: ({ focused }) => (
            <Image
              alt={'тест на счет'}
              source={require('../../../assets/images/timer.svg')}
              style={[{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="memoryTestRes"
        options={{
          title: 'Тест на память',
          tabBarIcon: ({ focused }) => (
            <Image
              alt={'тест на память'}
              source={require('../../../assets/images/cpu.svg')}
              style={[{ width: 30, height: 30, opacity: focused ? 1 : 0.5 }]}
            />
          ),
        }}
      />
    </Tabs>
  );
}
