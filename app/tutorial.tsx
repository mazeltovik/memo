import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  useAnimatedValue,
  Animated,
  Image,
  ImageBackground,
  TextInput,
  Button,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import useOnPressAnim from './hooks/onPress';
import { useEffect } from 'react';

export default function Tutorial() {
  const { scales: scale1, onPress: onPress1 } = useOnPressAnim();
  const { scales: scale2, onPress: onPress2 } = useOnPressAnim();
  const { scales: scale3, onPress: onPress3 } = useOnPressAnim();
  const rotateTile1 = useAnimatedValue(-90);
  const rotateTile2 = useAnimatedValue(-90);
  const rotateTile3 = useAnimatedValue(-90);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateTile1, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateTile2, {
        toValue: 0,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateTile3, {
        toValue: 0,
        duration: 1000,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [rotateTile1, rotateTile2, rotateTile3]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            {
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            },
            {
              transform: [{ scaleX: scale1.x }, { scaleY: scale1.y }],
            },
          ]}
        >
          <Pressable onPress={onPress1} style={[styles.tileContainer]}>
            <LinearGradient
              colors={['#e893e5', '#ff85b2', '#ff9768', '#ffc20e', '#a8eb12']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.tileHeader}
            />
            <Animated.View
              style={[
                styles.tileContent,
                {
                  transform: [
                    {
                      rotateX: rotateTile1.interpolate({
                        inputRange: [-90, 0],
                        outputRange: ['-90deg', '-0deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <ImageBackground
                blurRadius={2}
                alt="notebook"
                source={require('../assets/images/notebook.jpg')}
                style={styles.imageContainer}
              >
                <Text style={styles.tileText}>Обучение</Text>
              </ImageBackground>
            </Animated.View>
          </Pressable>
        </Animated.View>
        <View style={styles.doubleSection}>
          <Animated.View
            style={[
              { flex: 0.5 },
              {
                transform: [{ scaleX: scale2.x }, { scaleY: scale2.y }],
              },
            ]}
          >
            <Pressable onPress={onPress2} style={[styles.tileContainer]}>
              <LinearGradient
                colors={['#e893b9', '#ff968a', '#f5af58', '#b9d04c', '#12eb8c']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.tileHeader}
              />
              <Animated.View
                style={[
                  styles.tileContent,
                  {
                    transform: [
                      {
                        rotateX: rotateTile2.interpolate({
                          inputRange: [-90, 0],
                          outputRange: ['-90deg', '-0deg'],
                        }),
                      },
                    ],
                  },
                ]}
              ></Animated.View>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={[
              { flex: 0.5 },
              {
                transform: [{ scaleX: scale3.x }, { scaleY: scale3.y }],
              },
            ]}
          >
            <Pressable onPress={onPress3} style={[styles.tileContainer]}>
              <LinearGradient
                colors={['#e8a493', '#fcac79', '#ffbc58', '#eed233', '#c6eb12']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.tileHeader}
              />
              <Animated.View
                style={[
                  styles.tileContent,
                  {
                    transform: [
                      {
                        rotateX: rotateTile3.interpolate({
                          inputRange: [-90, 0],
                          outputRange: ['-90deg', '-0deg'],
                        }),
                      },
                    ],
                  },
                ]}
              ></Animated.View>
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: '#1d2029',
    paddingLeft: 16,
    paddingRight: 16,
  },
  tileContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  doubleSection: {
    flexDirection: 'row',
    gap: 18,
  },
  tileHeader: {
    height: 4,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    opacity: 0.6,
  },
  tileContent: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#252b43',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  imageContainer: {
    flex: 1,
    height: 100,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tileText: {
    textAlign: 'center',
    height: '100%',
    paddingTop: 30,
    color: 'white',
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
  },
});
