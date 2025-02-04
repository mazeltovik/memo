import {
  Text,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import useOnPressAnim from '../hooks/onPress';

type MenuItemType = {
  text: string;
  href: string;
  path: string;
};

const MenuItem = ({ text, href, path }: MenuItemType) => {
  const { scales, onPress } = useOnPressAnim();
  const { width: windowWidth } = useWindowDimensions();
  const onClick = () => {
    onPress();
  };
  return (
    <Animated.View
      style={[
        menuItemStyles.wrapper,
        { width: windowWidth * 0.5, height: windowWidth * 0.5 },
        {
          transform: [
            { scaleX: scales.x },
            { scaleY: scales.y },
            { perspective: 1000 },
          ],
        },
      ]}
    >
      <Link href={href} asChild>
        <Pressable onPress={onClick} style={menuItemStyles.container}>
          <View style={menuItemStyles.imgContainer}>
            <Image
              alt={text}
              source={path}
              style={[
                { width: windowWidth * 0.25, height: windowWidth * 0.25 },
              ]}
            />
          </View>
          <View style={menuItemStyles.textContainer}>
            <Text style={menuItemStyles.text}>{text}</Text>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
};

const menuItemStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#333a56',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#f6c25d',
  },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  imgContainer: {
    flex: 2,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

export default MenuItem;
