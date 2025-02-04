import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Carousel from '@/app/components/carousel';
import countTestSlides from './countTestSlides';
export default function CountTest() {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: 'Тест на счет',
          headerStyle: { backgroundColor: '#1d2029' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poiret-One',
            fontWeight: 'regular',
            color: '#daa543',
          },
        }}
      />
      <Carousel data={countTestSlides} />;
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
