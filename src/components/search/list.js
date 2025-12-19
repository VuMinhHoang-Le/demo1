import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native-elements';

// Set up items in list to trigger pressed style
const Item = ({ item, onPress, onButtonPress }) => (
  <Pressable
    onPress={() => onPress(item)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Text style={styles.itemText}> {item.title} </Text>
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.buttonLogo}
        onPress={() => onButtonPress(item)}
      >
        <Image
          source={require('../../assets/logo/favourite.png')}
          style={styles.buttonLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </Pressable>
);

// Set up list, render each item pressable and trigger onPressItem -> Callback to Search.js
export const List = ({ data, onPressItem, onButtonPressItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Item
          item={item}
          onPress={onPressItem}
          onButtonPress={onButtonPressItem}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  itemText: {
    fontSize: 20,
    margin: 10,
    justifyContent: 'flex-start'
  },
  pressed: {
    opacity: 0.6,
  },
  buttonLogo: {
    width: 24,
    height: 24,
    flexDirection: 'row', // horizontal layout
    justifyContent: 'space-between', // text left, icon right
    alignItems: 'flex-start',
    tintColor: '#FB2C36',
  },
  iconContainer: {
    flexDirection: 'row', // stack icons vertically
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
});
