import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Carousel from '@/app/components/carousel';
import trainingSlides from './trainingSlides';
export default function Training() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: 'Тренировка',
          headerStyle: { backgroundColor: '#1d2029' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poiret-One',
            fontWeight: 'regular',
            color: '#daa543',
          },
        }}
      />
      <Carousel data={trainingSlides} />;
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#1d2029',
    justifyContent: 'space-between',
  },
});
