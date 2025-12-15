import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
//import { SearchBar } from '@rneui/base';

import { SearchBar } from '../../components/SearchBar/SearchBar';

const Search = props => {
  const GEO_DATA = [
    { id: '1', title: 'Vietnam' },
    { id: '2', title: 'Da Namg' },
    { id: '3', title: 'Ho CHi Minh' },
    { id: '4', title: 'Ha Noi' },
  ];

  const [data, setData] = useState(GEO_DATA);
  const [searchValue, setSearchValue] = useState('');
  const [clicked, setClicked] = useState(false);
  const dataHolder = React.useRef(GEO_DATA);

  // const searchFunction = text => {
  //   const updatedData = dataHolder.current.filter(item => {
  //     const itemData = item.title.toUpperCase(); // Convert item title to uppercase
  //     const textData = text.toUpperCase(); // Convert search text to uppercase
  //     return itemData.includes(textData); // Check if item title includes the search text
  //   });
  //   setData(updatedData); // Update the filtered data
  //   setSearchValue(text); // Update the search value
  // };

  return (
    <View style={styles.container}>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        clicked={clicked}
        setClicked={setClicked}
      />
    </View>
  );
};

Search.options = {
  topBar: {
    title: {
      text: 'Search',
    },
  },
  bottomTab: {
    text: 'Search',
  },
};

export default Search;
