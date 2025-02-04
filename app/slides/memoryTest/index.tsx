import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Carousel from '@/app/components/carousel';
import memoryTestSlides from './memoryTestSlides';
export default function MemoryTest() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: 'Тест на память',
          headerStyle: { backgroundColor: '#1d2029' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poiret-One',
            fontWeight: 'regular',
            color: '#daa543',
          },
        }}
      />
      <Carousel data={memoryTestSlides} />;
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1d2029',
    justifyContent: 'space-between',
  },
});
