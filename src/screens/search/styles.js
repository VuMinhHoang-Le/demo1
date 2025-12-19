import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchBar: {
    flex: 1,
    justifyContent: 'flex-start'
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
  list: {
    flex: 10,
  }
});

export default styles;