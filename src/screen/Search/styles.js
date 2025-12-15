import { SearchBar } from 'react-native-elements';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  },
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,
  },
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 12,
  },

});

export default styles;