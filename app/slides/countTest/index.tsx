import { Stack } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Carousel from '@/app/components/carousel';
import countTestSlides from './countTestSlides';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function CountTest() {
  const router = useRouter();
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
            fontSize: 16,
          },
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => router.back()}
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
      <Carousel data={countTestSlides} />;
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
