import { Pressable, Text } from 'react-native';

const Item = ({ item, onPress }) => (
  <Pressable
    onPress={() => onPress(item)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Text style={styles.itemText}> {item.title} </Text>
  </Pressable>
);
