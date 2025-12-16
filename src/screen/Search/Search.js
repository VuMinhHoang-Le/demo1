import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';

import { SearchBar } from '../../components/SearchBar/SearchBar';
import { List } from '../../components/List/List';
import { GEO_DATA } from '../../utils/GeoListManager';

const Search = props => {
  const geoData = GEO_DATA;

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [clickedSearchBar, setClickedSearchBar] = useState(false);
  const dataHolder = React.useRef(geoData);

  useEffect(() => {
    if (searchValue.length >= 2) {
      filterSearch(searchValue);
    } else setData([]);
  }, [searchValue]);

  function filterSearch(searchValue) {
    const updatedData = dataHolder.current.filter(item => {
      const itemData = item.title.toUpperCase();
      const searchValueData = searchValue.toUpperCase();
      return itemData.includes(searchValueData);
    });
    setData(updatedData);
  }

  return (
    <View style={styles.root}>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        clickedSearchBar={clickedSearchBar}
        setClickedSearchBar={setClickedSearchBar}
      />
      {clickedSearchBar && (
        <View style={styles.list}>
          <List data={data} onPressItem={item => {}} />
        </View>
      )}
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
