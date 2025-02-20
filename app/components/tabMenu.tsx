import { useState, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  tabs: string[];
  translateX: Animated.Value;
  onPressItem: (itemIndex: number) => void;
};

const TabMenu = ({ tabs, translateX, onPressItem }: Props) => {
  const [layoutCount, setLayoutCount] = useState(0);
  const tabWidths = useRef(tabs.map(() => 0));
  const tabPositions = useRef(tabs.map(() => 0));

  const animateUnderline = (index: number) => {
    Animated.timing(translateX, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = (index: number) => {
    animateUnderline(index);
    onPressItem(index);
  };

  const onTabLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    tabWidths.current[index] = width;
    tabPositions.current = tabWidths.current.map((_, anIndex: number) =>
      tabWidths.current.slice(0, anIndex + 1).reduce((acc, curr) => acc + curr)
    );
    tabPositions.current.unshift(0);
    tabPositions.current.pop();
    setLayoutCount(layoutCount + 1);
  };

  const underlinePosition = translateX.interpolate({
    inputRange: tabPositions.current.map((_, index) => index),
    outputRange: tabPositions.current.map((position) => position),
  });

  return (
    <>
      <View style={styles.container}>
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={[styles.tab]}
              onLayout={(event) => onTabLayout(event, index)}
              onPress={() => handleTabPress(index)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          paddingHorizontal: 8,
        }}
      >
        <Animated.View
          style={{
            ...styles.underline,
            transform: [
              {
                translateX: underlinePosition,
              },
            ],
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
  },
  tabText: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
  },
  underline: {
    backgroundColor: 'white',
    borderRadius: 4,
    bottom: 0,
    height: 4,
    width: '50%',
  },
});

export default TabMenu;
