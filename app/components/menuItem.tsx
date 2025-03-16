import {
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { Link, RelativePathString } from 'expo-router';

type MenuItemType = {
  text: string;
  href: RelativePathString;
  path: string;
};

const MenuItem = ({ text, href, path }: MenuItemType) => {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <Link
      href={href}
      style={[
        menuItemStyles.wrapper,
        { width: windowWidth * 0.5, height: windowWidth * 0.5 },
      ]}
      asChild
    >
      <TouchableOpacity>
        <View style={menuItemStyles.container}>
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
        </View>
      </TouchableOpacity>
    </Link>
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
  },
});

export default MenuItem;
