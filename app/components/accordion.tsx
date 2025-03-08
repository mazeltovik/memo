import { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  MemoryTestSavingData,
  ChallengeSavingData,
  CountTestSavingData,
} from '../scripts/filesystem/types';

type ItemProps = {
  item: ChallengeSavingData | MemoryTestSavingData | CountTestSavingData;
  isActive: boolean;
  height: number;
  onPress: () => void;
};

type AccordionProps = {
  data: MemoryTestSavingData[] | ChallengeSavingData[] | CountTestSavingData[];
  height: number;
  accordionItem: 'challenge' | 'counteTest' | 'memoryTest';
};

const ChallengeItem = ({ item, isActive, onPress, height }: ItemProps) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);
  const contentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });
  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity onPress={onPress} style={styles.header}>
        <Text
          style={styles.headerTitle}
        >{`День тренировки: ${item.currentDay}`}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.itemWrapper, { height: contentHeight }]}>
        <View style={styles.content}>
          <Text style={styles.itemText}>Дата:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as ChallengeSavingData).date}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Время:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as ChallengeSavingData).formatedTime}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Правильно:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {`${(item as ChallengeSavingData).correct} из ${
              (item as ChallengeSavingData).totalChallenge
            }`}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Штраф:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {`+${(item as ChallengeSavingData).fine} сек`}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Оценка:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as ChallengeSavingData).evaluation}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const CountTestItem = ({ item, isActive, onPress, height }: ItemProps) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);
  const contentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });
  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity onPress={onPress} style={styles.header}>
        <Text
          style={styles.headerTitle}
        >{`День тренировки: ${item.currentDay}`}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.itemWrapper, { height: contentHeight }]}>
        <View style={styles.content}>
          <Text style={styles.itemText}>Дата:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as CountTestSavingData).date}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Общее время:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as CountTestSavingData).formatedTime}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Оценка:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as CountTestSavingData).evaluation}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const MemoryTestItem = ({ item, isActive, onPress, height }: ItemProps) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive]);
  const contentHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });
  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity onPress={onPress} style={styles.header}>
        <Text
          style={styles.headerTitle}
        >{`День тренировки: ${item.currentDay}`}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.itemWrapper, { height: contentHeight }]}>
        <View style={styles.content}>
          <Text style={styles.itemText}>Дата:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as CountTestSavingData).date}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Правильно:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {`${(item as MemoryTestSavingData).correct} из ${
              (item as MemoryTestSavingData).totalLen
            }`}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.itemText}>Процент выполнения:</Text>
          <Text
            style={[
              styles.itemText,
              {
                textAlign: 'right',
              },
            ]}
          >
            {(item as MemoryTestSavingData).percentage}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default function Accordion({
  data,
  height,
  accordionItem,
}: AccordionProps) {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const handleItemPress = (index: number) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: ChallengeSavingData | MemoryTestSavingData | CountTestSavingData;
    index: number;
  }) => {
    return accordionItem == 'challenge' ? (
      <ChallengeItem
        item={item}
        isActive={activeIndices.includes(index)}
        height={height}
        onPress={() => handleItemPress(index)}
      />
    ) : accordionItem == 'counteTest' ? (
      <CountTestItem
        item={item}
        isActive={activeIndices.includes(index)}
        height={height}
        onPress={() => handleItemPress(index)}
      />
    ) : (
      <MemoryTestItem
        item={item}
        isActive={activeIndices.includes(index)}
        height={height}
        onPress={() => handleItemPress(index)}
      />
    );
  };
  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.currentDay}
      contentContainerStyle={styles.wrapper}
      onScrollToIndexFailed={(info) => {
        setTimeout(() => {
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }
        }, 100);
      }}
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#252b43',
  },
  header: {
    padding: 16,
    backgroundColor: '#252b43',
    borderBottomColor: '#f6c25d',
    borderBottomWidth: 3,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    color: '#daa543',
  },
  itemWrapper: {
    marginBottom: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  itemText: {
    flex: 1,
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
  },
});
