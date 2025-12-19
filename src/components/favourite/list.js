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
const Item = ({ item, onPress, onButtonPressRemove }) => (
  <Pressable
    onPress={() => onPress(item)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Text style={styles.itemText}> {item.title} </Text>
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.buttonLogo}
        onPress={() => onButtonPressRemove(item)}
      >
        <Image
          source={require('../../assets/logo/trashcan.png')}
          style={styles.buttonLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </Pressable>
);

// Set up list, render each item pressable and trigger onPressItem -> Callback to Search.js
export const List = ({ data, onPressItem, onButtonPressItemRemove }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Item
          item={item}
          onPress={onPressItem}
          onButtonPressRemove={onButtonPressItemRemove}
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
    borderColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
  buttonLogo: {
    width: 24,
    height: 24,
    tintColor: '#9F0712',
  },
  iconContainer: {
    flexDirection: 'row', // stack icons vertically
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
});
