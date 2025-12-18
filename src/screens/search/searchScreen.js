import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { SearchBar } from '../../components/search/searchBar';
import { List } from '../../components/search/list';
import { GEO_DATA } from '../../utils/GeoList';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchLocationWeatherHandled } from '../../redux/weather/actions';
import { updateHistorySuccess} from '../../redux/history/actions'
const SearchScreen = props => {
  const geoData = GEO_DATA;

  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [clickedSearchBar, setClickedSearchBar] = useState(false);
  const dataHolder = React.useRef(geoData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue.length >= 2) {
      filterSearch(searchValue);
    } else setFilterData([]);
  }, [searchValue]);

  function filterSearch(searchValue) {
    const updatedData = dataHolder.current.filter(item => {
      const itemData = item.title.toUpperCase();
      const searchValueData = searchValue.toUpperCase();
      return itemData.includes(searchValueData);
    });
    setFilterData(updatedData);
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
          <List data={filterData} onPressItem={item => {
            dispatch(updateHistorySuccess(item));
            dispatch(getSearchLocationWeatherHandled(item.name));
          }} />
        </View>
      )}
    </View>
  );
};

SearchScreen.options = {
  topBar: {
    title: {
      text: 'Search',
    },
  },
  bottomTab: {
    text: 'Search',
  },
};

export default SearchScreen;
