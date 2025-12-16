import { FlatList, Pressable, StyleSheet, Text } from 'react-native';

// Set up items in list to trigger pressed style
const Item = ({ item, onPress }) => (
  <Pressable
    onPress={() => onPress(item)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Text style={styles.itemText}> {item.title} </Text>
  </Pressable>
);

// Set up list, render each item pressable and trigger onPressItem -> Callback to Search.js
export const List = ({ data, onPressItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Item item={item} onPress={onPressItem} />}
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
  },
  pressed: {
    opacity: 0.6,
  },
});
