import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-elements';

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
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../../assets/logo/search.png')}
            style={styles.buttonLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setSearchValue('');
            setClickedSearchBar(false);
          }}
        >
          <Image
            source={require('../../assets/logo/x.png')}
            style={styles.buttonLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: '70%',
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 10,
    paddingEnd: 10,
  },
  container: {
    flex: 1, // Take up the full screen
    flexDirection: 'row',
  },
  button: {
    width: 90,
    height: 50,
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 20,
  },
  buttonText: {
    alignContent: 'center',
  },
  buttonLogo: {
    width: 24,
    height: 24,
    tintColor: '#9F0712',
  },
});
