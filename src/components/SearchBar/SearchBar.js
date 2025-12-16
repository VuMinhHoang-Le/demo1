import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';

export const SearchBar = ({
  clickedSearchBar,
  setClickedSearchBar,
  searchValue,
  setSearchValue,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a city or country"
        value={searchValue}
        onChangeText={setSearchValue}
        onFocus={() => {
          setClickedSearchBar(true);
        }}
      />
      <View style={styles.button}>
        <Button title="Search" onPress={() => {}} />
      </View>
      <View style={styles.button}>
        <Button
          title="Cancel"
          onPress={() => {
            Keyboard.dismiss();
            setSearchValue('');
            setClickedSearchBar(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: '90%',
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 10,
    paddingEnd: 10,
  },
  container: {
    flex: 1, // Take up the full screen
    alignItems: 'center'
  },
  button: {
    width: '60%',
    marginTop: 5,
    marginBottom: 5,
  },
});
