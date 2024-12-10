import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  useAnimatedValue,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Carousel from './components/carousel';
import Tutorial from './tutorial';
import WordTest from './training/wordTest';

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'Fourth Item',
  },
];

export default function App() {
  return <WordTest />;
}

// type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

// const FadeInView: React.FC<FadeInViewProps> = props => {
//    // Initial value for opacity: 0
//   const start = useAnimatedValue(100);
//   const finish = useAnimatedValue(300);

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(start, {
//           toValue: 300,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(start, {
//           toValue: 100,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//     setTimeout(()=>{
//       start.stopAnimation();
//     },10000)
//   }, []);

//   return (
//     <Animated.View // Special animatable View
//       style={{
//         ...props.style,
//          // Bind opacity to animated value
//          transform:[{
//           translateY:start
//         }]
//       }}>
//       <Text>Hello</Text>
//     </Animated.View>
//   );
// };

// // You can then use your `FadeInView` in place of a `View` in your components:
// export default () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <FadeInView
//         style={{
//           width: 250,
//           height: 50,
//           backgroundColor: 'powderblue',
//         }}>
//         <Text style={{fontSize: 28, margin: 10}}>
//           Fading in
//         </Text>
//       </FadeInView>
//     </View>
//   );
// };

// // export default function Index() {
// //   // const scrollX = useAnimatedValue(0);

// //   const {width: windowWidth} = useWindowDimensions();

// //   const fadeAnim = useAnimatedValue(0); // Initial value for opacity: 0
// //   console.log(fadeAnim);
// //   useEffect(() => {
// //     Animated.timing(fadeAnim, {
// //       toValue: 1,
// //       duration: 20000,
// //       useNativeDriver: true,
// //     }).start();
// //   }, [fadeAnim]);

// //   return (
// //     <Animated.View style={{
// //       opacity: fadeAnim, // Bind opacity to animated value
// //     }}> // Special animatable View
// //       Fading
// //     </Animated.View>
// //   );
// // }

// {/* <SafeAreaProvider>
// <SafeAreaView style={styles.container}>
//   <View style={styles.scrollContainer}>
//     <ScrollView
//       horizontal={true}
//       pagingEnabled
//       showsHorizontalScrollIndicator={false}
//       onScroll={Animated.event([
//         {
//           nativeEvent: {
//             contentOffset: {
//               x: scrollX,
//             },
//           },
//         },
//       ])}
//       scrollEventThrottle={1}>
//       {DATA.map((image, imageIndex) => {
//         return (
//           <View
//             style={{width: windowWidth, height: 250}}
//             key={imageIndex}>
//             <View style={styles.textContainer}>
//                 <Text style={styles.infoText}>
//                   {'Image - ' + imageIndex}
//                 </Text>
//               </View>
//           </View>
//         );
//       })}
//     </ScrollView>
//     <View style={styles.indicatorContainer}>
//       {DATA.map((image, imageIndex) => {
//         const width = scrollX.interpolate({
//           inputRange: [
//             windowWidth * (imageIndex - 1),
//             windowWidth * imageIndex,
//             windowWidth * (imageIndex + 1),
//           ],
//           outputRange: [8, 16, 8],
//           extrapolate: 'clamp',
//         });
//         return (
//           <Animated.View
//             key={imageIndex}
//             style={[styles.normalDot, {width}]}
//           />
//         );
//       })}
//     </View>
//   </View>
// </SafeAreaView>
// </SafeAreaProvider> */}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   scrollContainer: {
//     height: 300,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   card: {
//     flex: 1,
//     marginVertical: 4,
//     marginHorizontal: 16,
//     borderRadius: 5,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textContainer: {
//     backgroundColor: 'rgba(0,0,0, 0.7)',
//     paddingHorizontal: 24,
//     paddingVertical: 8,
//     borderRadius: 5,
//     width: 500,
//     height:200
//   },
//   infoText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   normalDot: {
//     height: 8,
//     width: 8,
//     borderRadius: 4,
//     backgroundColor: 'silver',
//     marginHorizontal: 4,
//   },
//   indicatorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
