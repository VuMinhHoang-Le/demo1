import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';

export const SearchBar = ({
  clicked,
  setClicked,
  searchValue,
  setSearchValue,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Type a city or country"
          value={searchValue}
          onChangeText={setSearchValue}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
      <View>
        <Button
          title="Search"
          borderWidth={10}
          borderRadius={10}
          margin={10}
          paddingVertical={10}
          paddingHorizontal={10}
          onPress={() => {}}
        />
      </View>
      <View>
        <Button
          title="Cancel"
          borderWidth={10}
          borderRadius={10}
          margin={10}
          paddingVertical={10}
          paddingHorizontal={10}
          onPress={() => {
            Keyboard.dismiss();
            setSearchValue("");
            setClicked(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
});
