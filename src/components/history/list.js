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
const Item = ({
  item,
  onPress,
  onButtonPressLocation,
  onButtonPressRemove,
}) => (
  <Pressable
    onPress={() => onPress(item)}
    style={({ pressed }) => [styles.item, pressed && styles.pressed]}
  >
    <Text style={styles.itemText}> {item.title} </Text>

    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() => onButtonPressLocation(item)}
      >
        <Image
          source={require('../../assets/logo/location.png')}
          style={styles.buttonLogoLocation}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onButtonPressRemove(item)}
      >
        <Image
          source={require('../../assets/logo/trashcan.png')}
          style={styles.buttonLogoRemove}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </Pressable>
);

// Set up list, render each item pressable and trigger onPressItem -> Callback to Search.js
export const List = ({
  data,
  onPressItem,
  onButtonPressItemLocation,
  onButtonPressItemRemove,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Item
          item={item}
          onPress={onPressItem}
          onButtonPressLocation={onButtonPressItemLocation}
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
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.6,
  },
  buttonLogoLocation: {
    width: 24,
    height: 24,
    tintColor: '#31C950'
  },
    buttonLogoRemove: {
    width: 24,
    height: 24,
    tintColor: '#9F0712'
  },
  iconWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    flexDirection: 'row', // stack icons vertically
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
});
